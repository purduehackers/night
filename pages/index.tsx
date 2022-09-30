import type { GetStaticProps, NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Posts from '../components/posts'
import NowPlaying from '../components/now-playing'
import Time from '../components/time'
import { fetchPosts } from '../lib/fetch-posts'
import { Post } from '../types/posts'

const Home = ({ posts }: { posts: Post[] }) => {
  const { data: session } = useSession()
  const router = useRouter()

  if (router.query?.signOut) {
    signOut()
    router.push('/')
  }

  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center py-2">
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
      <div className="grid grid-cols-3 grid-gap-0 min-h-screen">
        <NowPlaying />
        <Time />
        <Posts posts={posts} />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchPosts()

  return {
    props: { posts },
    revalidate: 10
  }
}

export default Home
