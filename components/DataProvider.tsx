import { createContext, ReactNode } from 'react'
import useSWR from 'swr'

import { fetcher } from '../lib/util'

type DataValue = {
  songData: any
  fishData: any
}

const fallbackSongData = {
  title: 'Not playing',
  artist: 'Not playing',
  image:
    'https://i.iheart.com/v3/re/new_assets/63502b9eaee0f4b0e56f9a54?ops=contain(1480,0)'
}

const fallbackFishData = {
  url: 'https://v5.airtableusercontent.com/v1/9/9/1666828800000/tlZplDSgY0TDPT--9K2Qvw/RB3_qnXu1I1s04S57VQcSpREXBpm2GvbBasWMHHjifmCqiUOr4EQjulb5rJo3LZropy5WTSkUvlXo6vufm4KFw/26Na1OLaYI7mSfHjk67nEQ-Uew_68_mowWa8txLQP6A'
}

export const DataContext = createContext<DataValue>({
  songData: fallbackSongData,
  fishData: fallbackSongData
})

type Props = {
  children: ReactNode
}

export const DataContextProvider = ({ children }: Props) => {
  const { data: songData } = useSWR('/api/playing', fetcher, {
    fallbackData: fallbackSongData,
    refreshInterval: 5000
  })

  const { data: fishData } = useSWR('/api/fetch-fish', fetcher, {
    fallbackData: fallbackFishData,
    refreshInterval: 10000
  })

  return (
    <DataContext.Provider
      value={{
        songData,
        fishData
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
