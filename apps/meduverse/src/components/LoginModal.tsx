import { useState } from 'react'
import styled from 'styled-components'
import {
  Text,
  Toggle,
  Flex,
  Modal,
  InjectedModalProps,
  Input,
  Button,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import {
  // useSession, 
  signIn,
  // signOut 
} from "next-auth/react"

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  height: auto;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-height: 90vh;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: none;
  }
`
const LoginModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const [remember, setRemember] = useState(true)
  const { t } = useTranslation()

  return (
    <Modal title={t('Login')} headerBackground="gradientCardHeader" onDismiss={onDismiss}>
      <ScrollableContainer>
        <Flex pb="24px" flexDirection="column">
          <Flex flexDirection={"column"} mb="24px">
            <Input placeholder={t('Username')} />
          </Flex>
          <Flex flexDirection={"column"} mb="24px">
            <Input placeholder={t('Password')} />
          </Flex>

          <Flex justifyContent="space-between" alignItems="center" mb="24px">
            <Text>{t('Remember me?')}</Text>
            <Toggle
              id="toggle-subgraph-health-button"
              checked={remember}
              scale="md"
              onChange={() => {
                setRemember(!remember)
              }}
            />
          </Flex>
          <Button onClick={() => { signIn('keycloak') }}>Login Keycloak</Button>
        </Flex>
      </ScrollableContainer>
    </Modal>
  )
}

export default LoginModal
