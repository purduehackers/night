import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr'
import Head from 'next/head'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const fallbackData = {
    title: 'Not playing',
    artist: 'Not playing',
    image:
      'https://collegian.com/wp-content/uploads/2017/08/spotify-1759471_1280.jpg'
  }
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data } = useSWR('/api/playing', fetcher, { fallbackData })

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

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <img src={data.image} className="max-w-xs" />
        <p className="font-bold text-xl">{data.title}</p>
        <p>{data.artist}</p>
        <button
          className="border-4 border-red-500 rounded px-2"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </main>
    </div>
  )
}

export default Home
