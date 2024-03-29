import Head from 'next/head'
import useSWR from 'swr'
import Posts from '../components/posts'
import NowPlaying from '../components/now-playing'
import Time from '../components/time'
import { DoorbellContext, DoorbellCard } from '../components/doorbell'
import { LightningTimeProvider } from '../components/lightning-time-context'
import { fetchPosts } from '../lib/fetch-posts'
import { fetchFish } from '../lib/fetch-fish'
import { InferGetStaticPropsType } from 'next'

const Home = ({
  posts,
  fish
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

  return (
    <LightningTimeProvider>
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
            <NowPlaying initialFishData={fish} songData={songData} />
            <div>
              <Time />
              <DoorbellContext>
                <DoorbellCard />
              </DoorbellContext>
            </div>
            <Posts initialData={posts} />
          </div>
        </div>
      </div>
    </LightningTimeProvider>
  )
}

export async function getStaticProps() {
  const posts = await fetchPosts()
  const fish = await fetchFish()

  return {
    props: {
      posts,
      fish
    }
  }
}

export default Home
