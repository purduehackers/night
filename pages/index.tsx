import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import Head from 'next/head'
import Grid3 from '../components/grid-3'
import NowPlaying from '../components/now-playing'
import Time from '../components/time'

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
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <Head>
        <title>Hack Night</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-3 min-h-screen">
        <NowPlaying />
        <Time />
        <Grid3 />
      </div>
    </div>
  )
}

export default Home
