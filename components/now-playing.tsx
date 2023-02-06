import useSWR from 'swr'

const NowPlaying = ({ songData }: { songData: any }) => {
  const fallbackFishData = {
    url: 'https://v5.airtableusercontent.com/v1/9/9/1666828800000/tlZplDSgY0TDPT--9K2Qvw/RB3_qnXu1I1s04S57VQcSpREXBpm2GvbBasWMHHjifmCqiUOr4EQjulb5rJo3LZropy5WTSkUvlXo6vufm4KFw/26Na1OLaYI7mSfHjk67nEQ-Uew_68_mowWa8txLQP6A'
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
