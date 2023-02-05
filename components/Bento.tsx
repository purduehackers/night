import { LightningTime } from '@purduehackers/time'
import { useState, useEffect, ReactNode, useMemo, useRef } from 'react'

import { Post } from '../types/types'
import {
  Slot2x1,
  Slot2x2,
  Slot2x3,
  Slot4x2,
  SlotLCenter,
  SlotLLeft,
  SlotLTop,
  SlotProject,
  SlotTime
} from './BentoSlot'

type SlotShape = 'square' | 'rect'

type SlotSeq = `${SlotShape}-${SlotShape}-${SlotShape}`

const SlotSeqRender: Record<SlotSeq, (postsSlots: ReactNode[]) => ReactNode> = {
  'square-square-square': function (postsSlots: ReactNode[]): ReactNode {
    return (
      <>
        <SlotTime />
        <Slot2x3 />
        {postsSlots[0]}
        <Slot4x2 />
        {postsSlots[1]}
        <Slot2x3 />
        <Slot2x1 />
        {postsSlots[2]}
        <Slot4x2 />
        <SlotLTop />
        <SlotLLeft />
        <SlotLCenter />
      </>
    )
  },
  'square-square-rect': function (postsSlots: ReactNode[]): ReactNode {
    throw new Error('Function not implemented.')
  },
  'square-rect-square': function (postsSlots: ReactNode[]): ReactNode {
    throw new Error('Function not implemented.')
  },
  'square-rect-rect': function (postsSlots: ReactNode[]): ReactNode {
    throw new Error('Function not implemented.')
  },
  'rect-square-square': function (postsSlots: ReactNode[]): ReactNode {
    return (
      <>
        <SlotTime />
        {postsSlots[0]}
        <Slot4x2 />
        {postsSlots[1]}
        <Slot2x3 />
        <Slot2x2 />
        {postsSlots[2]}
        <SlotLTop />
        <Slot2x1 />
        <Slot4x2 />
        <SlotLLeft />
        <SlotLCenter />
      </>
    )
  },
  'rect-square-rect': function (postsSlots: ReactNode[]): ReactNode {
    throw new Error('Function not implemented.')
  },
  'rect-rect-square': function (postsSlots: ReactNode[]): ReactNode {
    throw new Error('Function not implemented.')
  },
  'rect-rect-rect': function (postsSlots: ReactNode[]): ReactNode {
    throw new Error('Function not implemented.')
  }
}

const lt = new LightningTime()

const getCurrentLightning = () =>
  lt.convertToLightning(new Date()).lightningString

type ImageType = 'wide' | 'tall' | 'square'

const SLOT_STYLES: Record<ImageType, string> = {
  wide: 'col-span-4 row-span-4',
  tall: 'col-span-4 row-span-4 flex',
  square: 'col-span-6 row-span-3 flex'
}

// idk this is arbitrary
const postKey = (post: Post) => `${post.createdTime}-${post.username}`

const imgToType = (img: HTMLImageElement): ImageType => {
  const ratio = img.naturalWidth / img.naturalHeight
  if (ratio > 1.5) return 'wide'
  if (ratio < 0.7) return 'tall'
  return 'square'
}

const imgTypesToShapes = (
  types: [ImageType, ImageType, ImageType]
): SlotSeq => {
  return `${types[0] === 'square' ? 'rect' : 'square'}-${
    types[1] === 'square' ? 'rect' : 'square'
  }-${types[2] === 'square' ? 'rect' : 'square'}`
}

const Bento = () => {
  // const { data: posts } = useSWR('/api/fetch-posts', fetcher, {
  //   fallbackData,
  //   refreshInterval: 5000
  // })

  const posts = fallbackData as Post[]

  const [lightning, setLightning] = useState<string>(getCurrentLightning())

  useEffect(() => {
    const timer = setInterval(() => {
      const currentLightning = getCurrentLightning()
      if (currentLightning === lightning) return

      setLightning(currentLightning)
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const boltRef = useRef<HTMLImageElement>(null)
  const zapRef = useRef<HTMLImageElement>(null)
  const sparkRef = useRef<HTMLImageElement>(null)

  const { boltColor, zapColor, sparkColor } = lt.getColors(lightning)
  const colors = [boltColor, zapColor, sparkColor]

  const [imageTypes, setImageTypes] = useState<
    [ImageType, ImageType, ImageType]
  >(['wide', 'wide', 'wide']) // arbitrary default, but i guess most images are landscape

  useEffect(() => {
    if (boltRef.current === null) return
    if (zapRef.current === null) return
    if (sparkRef.current === null) return

    setImageTypes([
      imgToType(boltRef.current),
      imgToType(zapRef.current),
      imgToType(sparkRef.current)
    ])
  }, [boltRef.current])

  const seq = imgTypesToShapes(imageTypes)

  console.log('seq', seq)

  const postSlots = posts.map((post: Post, index) => (
    <SlotProject
      key={postKey(post)}
      imgSrc={post.attachments[0].url}
      desc={post.description}
      avatarSrc={post.avatar[0].url}
      username={post.username}
      style={{
        background: `#${colors[index % 3]}`
      }}
      ref={index === 0 ? boltRef : index === 1 ? zapRef : sparkRef}
      className={SLOT_STYLES[imageTypes[index]]}
    />
  ))

  return (
    <div className="max-h-screen aspect-[4/3] bg-stone-800 p-3 m-auto rounded-sm">
      <div className="h-full grid grid-cols-12 grid-rows-9 grid-flow-row-dense p-1 bg-stone-900 rounded-lg shadow-[inset_0_0_40px_20px_#080808]">
        {SlotSeqRender[seq](postSlots)}
      </div>
    </div>
  )
}

export default Bento

const s1 = {
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
}
const s2 = {
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
}
const s3 = {
  username: 'wide long asd ',
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
}
const rect = {
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
const rss = [rect, s1, s2]
const sss = [s1, s3, s2]
const fallbackData = sss
