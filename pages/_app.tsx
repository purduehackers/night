import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Space_Grotesk, Space_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-grotesk'
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono'
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV
  return (
    <>
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
      <main
        className={`${spaceGrotesk.variable} ${spaceMono.variable} font-main`}
      >
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
