import { ModalProvider, light, dark, UIKitProvider } from '@pancakeswap/uikit'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { LanguageProvider } from '@pancakeswap/localization'
import { fetchStatusMiddleware } from 'hooks/useSWRContract'
import { Store } from '@reduxjs/toolkit'
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes'
import { WagmiProvider } from '@pancakeswap/wagmi'
import { client } from 'utils/wagmi'
import { HistoryManagerProvider } from 'contexts/HistoryContext'
import { SessionProvider } from "next-auth/react"

const StyledUIKitProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  const { resolvedTheme } = useNextTheme()
  return (
    <UIKitProvider theme={resolvedTheme === 'dark' ? dark : light} {...props}>
      {children}
    </UIKitProvider>
  )
}

const Providers: React.FC<React.PropsWithChildren<{ session?: any; store: Store; children: React.ReactNode }>> = ({
  children,
  store,
  session
}) => {
  return (
    <WagmiProvider client={client}>
      <Provider store={store}>
        <NextThemeProvider>
          <StyledUIKitProvider>
            <LanguageProvider>
              <SWRConfig
                value={{
                  use: [fetchStatusMiddleware],
                }}
              >
                <HistoryManagerProvider>
                  <ModalProvider>
                    <SessionProvider session={session}>
                      {children}
                    </SessionProvider>
                  </ModalProvider>
                </HistoryManagerProvider>
              </SWRConfig>
            </LanguageProvider>
          </StyledUIKitProvider>
        </NextThemeProvider>
      </Provider>
    </WagmiProvider>
  )
}

export default Providers
