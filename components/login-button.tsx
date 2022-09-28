import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr'

export default function Component() {
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
  if (session) {
    return (
      <>
        <img src={data.image} className="max-w-xs" />
        <p className="font-bold text-xl">{data.title}</p>
        <p>{data.artist}</p>
        <button
          className="border-4 border-red-500 rounded px-2"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      <button
        className="bg-amber-400 rounded p-2 font-bold shadow"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  )
}
