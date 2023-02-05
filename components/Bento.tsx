import { LightningTime } from '@purduehackers/time'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

import { Post } from '../types/types'

const BentoSlot = dynamic(() => import('./BentoSlot'), {
  ssr: false
})

export const Bento = () => {
  // const { data: posts } = useSWR('/api/fetch-posts', fetcher, {
  //   fallbackData,
  //   refreshInterval: 5000
  // })

  const posts = fallbackData as Post[]

  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      const lt = new LightningTime()
      const convertedTime = lt.convertToLightning(new Date()).lightningString
      setColors(Object.values(lt.getColors(convertedTime)))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-h-screen aspect-[4/3] bg-stone-800 p-3 m-auto rounded-sm">
      <div className="h-full grid grid-cols-12 grid-rows-9 grid-flow-row-dense gap-2 p-2 bg-stone-900 rounded-lg shadow-[inset_0_0_40px_20px_#080808]">
        {posts.map((post: Post, index) => (
          <BentoSlot
            key={post.createdTime}
            imgSrc={post.attachments[0].url}
            desc={post.description}
            avatarSrc={post.avatar[0].url}
            username={post.username}
            className="border-stone-600 border rounded-xl shadow-[inset_0_0_40px_20px_black]"
            style={{
              background: `#${colors[index % 3]}`
            }}
          />
        ))}
      </div>
    </div>
  )
}

const fallbackData = [
  {
    username: 'tall short',
    avatar: [
      { url: 'https://avatars.githubusercontent.com/u/5734109?s=200&v=4' }
    ],
    description: 'cool',
    attachments: [
      {
        url: 'https://media.discordapp.net/attachments/1052236377338683514/1070483168454524938/maybe.jpg?width=351&height=742'
      }
    ]
  },
  {
    username: 'tall long',
    avatar: [
      { url: 'https://avatars.githubusercontent.com/u/5734109?s=200&v=4' }
    ],
    description:
      'Hey i made some really col thing for purdue hackers and worte a descr',
    attachments: [
      {
        url: 'https://media.discordapp.net/attachments/1052236377338683514/1070483168454524938/maybe.jpg?width=351&height=742'
      }
    ]
  },
  {
    username: 'wide short',
    avatar: [
      { url: 'https://avatars.githubusercontent.com/u/5734109?s=200&v=4' }
    ],
    description: 'but this is even cooler',
    attachments: [
      {
        url: 'https://media.discordapp.net/attachments/1020777328172859412/1068789112158556221/Screenshot_from_2023-01-28_00-43-03.png?width=1440&height=714'
      }
    ]
  },
  {
    username: 'wide long',
    avatar: [
      { url: 'https://avatars.githubusercontent.com/u/5734109?s=200&v=4' }
    ],
    description:
      'but this is even cooler and i spent more time to type an extra long description',
    attachments: [
      {
        url: 'https://media.discordapp.net/attachments/1020777328172859412/1068789112158556221/Screenshot_from_2023-01-28_00-43-03.png?width=1440&height=714'
      }
    ]
  },
  {
    username: 'square short',
    avatar: [
      { url: 'https://avatars.githubusercontent.com/u/5734109?s=200&v=4' }
    ],
    description: 'short desc',
    attachments: [
      {
        url: 'https://media.discordapp.net/attachments/1020777328172859412/1068787892522078288/A7E2E609-8FC1-429D-8008-A7E90CB2624B.jpg?width=776&height=742'
      }
    ]
  },
  {
    username: 'square long',
    avatar: [
      { url: 'https://avatars.githubusercontent.com/u/5734109?s=200&v=4' }
    ],
    description:
      'but this is even cooler and also has a longer text description which is awfully convenient because there is more space',
    attachments: [
      {
        url: 'https://media.discordapp.net/attachments/1020777328172859412/1068787892522078288/A7E2E609-8FC1-429D-8008-A7E90CB2624B.jpg?width=776&height=742'
      }
    ]
  }
]
