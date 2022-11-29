import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import {
  Box,
  Button,
  Flex,
  LogoutIcon,
  RefreshIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
  UserMenuVariant,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Trans from 'components/Trans'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useProfile } from 'state/profile/hooks'
import { usePendingTransactions } from 'state/transactions/hooks'
import { useAccount } from 'wagmi'
import { useSession, signIn, signOut } from 'next-auth/react'
import ProfileUserMenuItem from './ProfileUserMenuItem'
import WalletModal, { WalletView } from './WalletModal'
import WalletUserMenuItem from './WalletUserMenuItem'

const UserProfileMenu = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId, isWrongNetwork } = useActiveChainId()
  // const { logout } = useAuth()
  const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const [onPresentWrongNetworkModal] = useModal(<WalletModal initialView={WalletView.WRONG_NETWORK} />)
  const hasProfile = isInitialized && !!profile
  const avatarSrc = profile?.nft?.image?.thumbnail
  const [userMenuText, setUserMenuText] = useState<string>('')
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')

  const { data: session } = useSession()

  console.log("session", session)

  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuText(t('%num% Pending', { num: pendingNumber }))
      setUserMenuVariable('pending')
    } else {
      setUserMenuText('')
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])

  const onClickWalletMenu = (): void => {
    if (isWrongNetwork) {
      onPresentWrongNetworkModal()
    } else {
      onPresentWalletModal()
    }
  }

  const UserMenuItems = () => {
    return (
      <>
        <UserMenuItem as="button" disabled={isWrongNetwork} onClick={() => { }}>
          {t('Recent Transactions')}
          {hasPendingTransactions && <RefreshIcon spin />}
        </UserMenuItem>
        <UserMenuDivider />
        <NextLink href={`/profile/${account?.toLowerCase()}`} passHref>
          <UserMenuItem as="a" disabled={isWrongNetwork || chainId !== ChainId.BSC}>
            {t('Your NFTs')}
          </UserMenuItem>
        </NextLink>
        {/* <ProfileUserMenuItem
          isLoading={isLoading}
          hasProfile={hasProfile}
          disabled={isWrongNetwork || chainId !== ChainId.BSC}
        /> */}
        <UserMenuDivider />
        <UserMenuItem as="button" onClick={() => signOut()}>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            {t('Sign out')}
            <LogoutIcon />
          </Flex>
        </UserMenuItem>
      </>
    )
  }

  if (session) {
    return (
      <UIKitUserMenu account={account} avatarSrc={avatarSrc} text={session?.user?.name} variant={userMenuVariable}>
        {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
      </UIKitUserMenu>
    )
  }

  return (
    <Button onClick={() => signIn('keycloak')} scale="sm">
      <Trans>Sign In</Trans>
    </Button>
  )
}

export default UserProfileMenu
