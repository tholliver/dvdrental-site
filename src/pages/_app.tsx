import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store'

export default function App({ Component, pageProps }: AppProps) {
  const store = makeStore()
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
