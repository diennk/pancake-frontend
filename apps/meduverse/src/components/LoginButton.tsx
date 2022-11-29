import { useTranslation } from '@pancakeswap/localization'
import { Button, ButtonProps, useModal } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import { useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'
import { useConnect } from 'wagmi'
import LoginModal from './LoginModal'
import SettingsModal from './Menu/GlobalSettings/SettingsModal'
import Trans from './Trans'

const LoginButton = ({ children, ...props }: ButtonProps) => {
  const [onPresentSettingsModal] = useModal(<LoginModal />)

  const {
    t,
    currentLanguage: { code },
  } = useTranslation()

  const { data: session } = useSession()

  console.log("session", session)

  return (
    <>
      <Button onClick={onPresentSettingsModal} {...props} variant="primary">
        {children || <Trans>Login</Trans>}
      </Button>

    </>
  )
}

export default LoginButton
