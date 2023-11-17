import useSWR from 'swr'
import { Fish } from '../types/types'

const NowPlaying = ({
  initialFishData,
  songData
}: {
  initialFishData: Fish
  songData: any
}) => {
  const fallbackFishData = {
    url: initialFishData.fish[0].url
  }
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data: fishData } = useSWR('/api/fetch-fish', fetcher, {
    fallbackData: fallbackFishData,
    refreshInterval: 10000
  })
  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-col items-center justify-center text-center mt-8 ml-8 w-10/12">
        <img src={songData.image} className="rounded-lg" />
        <p className="font-bold text-4xl mt-4 mb-2">{songData.title}</p>
        <p className="text-xl text-gray-300">{songData.artist}</p>
      </div>
      <div className="flex flex-col mt-4 ml-8 w-10/12 items-center">
        <img src={fishData.url} width={225} className="rounded-lg" />
        <h1 className="text-3xl mt-2 font-bold">FISH OF THE DAY</h1>
      </div>
    </div>
  )
}

export default NowPlaying
