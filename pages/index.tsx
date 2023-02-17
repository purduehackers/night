import { signIn, signOut, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { DataContextProvider } from '../components/DataProvider'
import { TimeContextProvider } from '../components/TimeProvider'

const Bento = dynamic(() => import('../components/Bento'), {
  ssr: false
})

const Home = () => {
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
            onClick={() => signIn('spotify')}
          >
            Sign in with Spotify
          </button>
        </main>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Hack Night</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex picnic-blanket overflow-hidden">
        <DataContextProvider>
          <TimeContextProvider>
            <Bento />
          </TimeContextProvider>
        </DataContextProvider>
      </div>
    </>
  )
}

export default Home
