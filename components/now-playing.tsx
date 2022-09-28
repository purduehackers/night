import { signOut } from 'next-auth/react'
import useSWR from 'swr'

const NowPlaying = () => {
  const fallbackData = {
    title: 'Not playing',
    artist: 'Not playing',
    image:
      'https://collegian.com/wp-content/uploads/2017/08/spotify-1759471_1280.jpg'
  }
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data } = useSWR('/api/playing', fetcher, { fallbackData })
  return (
    <div className="flex flex-col items-center text-center mt-8 ml-8 w-10/12">
      <img src={data.image} className="rounded-lg" />
      <p className="font-bold text-4xl mt-4 mb-2">{data.title}</p>
      <p className="text-xl">{data.artist}</p>
    </div>
  )
}

export default NowPlaying
