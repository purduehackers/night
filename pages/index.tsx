import { useSession, signIn, signOut } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Posts from '../components/posts'
import NowPlaying from '../components/now-playing'
import Time from '../components/time'
import { DoorbellContext, DoorbellCard } from '../components/doorbell'

const Home = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (router.query?.signOut) {
    signOut()
    router.push('/')
  }

  const fallbackSongData = {
    title: 'Not playing',
    artist: 'Not playing',
    image:
      'https://collegian.com/wp-content/uploads/2017/08/spotify-1759471_1280.jpg'
  }
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data: songData } = useSWR('/api/playing', fetcher, {
    fallbackData: fallbackSongData,
    refreshInterval: 5000
  })

  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center py-2">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <button
            className="bg-green-500 rounded-lg p-6 font-bold text-4xl shadow-lg"
            onClick={() => signIn('spotify')}
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
      <div
        style={{
          backgroundImage: `url(${songData.image})`,
          backgroundSize: '125vw',
          backgroundPosition: '50% 40%'
        }}
      >
        <div className="grid grid-cols-3 grid-gap-0 items-start min-h-screen bg-gray-800/80 backdrop-blur-lg">
          <NowPlaying songData={songData} />
          <div>
            <Time />
            <DoorbellContext>
              <DoorbellCard />
            </DoorbellContext>
          </div>
          <Posts />
        </div>
      </div>
    </div>
  )
}

export default Home
