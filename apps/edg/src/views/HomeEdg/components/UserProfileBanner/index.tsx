import {
  Flex,
  Heading,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useSession } from 'next-auth/react'
import { useTranslation } from '@pancakeswap/localization'

const Desktop = styled(Flex)`
  align-items: center;
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }
`

const Mobile = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`
const UserProfileBanner = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()

  return (
    <>
      {(isTablet || isDesktop) && (
        <Desktop>
          <Flex flexDirection="column">
            <Heading scale="xl">
              {t('Hi, %userName%!', {
                userName: session?.user?.name,
              })}
            </Heading>
          </Flex>
        </Desktop>
      )}
      {isMobile && (
        <Mobile>
          <Heading mb="18px" textAlign="center">
            {t('Hi, %userName%!', {
              userName: session?.user?.name,
            })}
          </Heading>
        </Mobile>
      )}
    </>
  )
}

export default UserProfileBanner
