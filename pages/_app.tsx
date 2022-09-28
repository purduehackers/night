import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          rel="icon"
          href={
            vercelEnv === 'production'
              ? '/favicon.ico'
              : vercelEnv === 'preview'
              ? '/favicon_preview.ico'
              : '/favicon_dev.ico'
          }
        />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
