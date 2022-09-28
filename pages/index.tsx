import type { NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import NowPlaying from '../components/now-playing'

const Home: NextPage = () => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <button
            className="bg-green-500 rounded-lg p-6 font-bold text-4xl shadow-lg"
            onClick={() => signIn()}
          >
            Sign in with Spotify
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Hack Night</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NowPlaying />
    </div>
  )
}

export default Home
