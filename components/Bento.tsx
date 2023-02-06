import { LightningTime } from '@purduehackers/time'
import {
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useRef,
  useContext
} from 'react'

import { Post } from '../types/types'
import {
  Slot1x3,
  Slot2x1,
  Slot2x2,
  Slot2x3,
  Slot3x3,
  Slot4x2,
  SlotLCenter,
  SlotLLeft,
  SlotLTop,
  SlotProject,
  SlotTime
} from './BentoSlot'
import { TimeContext } from './TimeProvider'

type SlotShape = 'square' | 'rect'

type ShapeSequence = `${SlotShape}-${SlotShape}-${SlotShape}`

const rendererFromSequence: Record<
  ShapeSequence,
  (postsSlots: ReactNode[]) => ReactNode
> = {
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
    return (
      <>
        <SlotTime />
        <Slot2x2 />
        {postsSlots[0]}
        <Slot2x2 />
        <Slot1x3 />
        <Slot2x3 />
        <Slot3x3 />
        {postsSlots[1]}
        <Slot2x2 />
        {postsSlots[2]}
        <Slot2x3 />
        <Slot2x1 />
        <Slot2x1 />
      </>
    )
  },
  'square-rect-square': function (postsSlots: ReactNode[]): ReactNode {
    return (
      <>
        <SlotTime />
        <Slot2x1 />
        {postsSlots[0]}
        <Slot2x3 />
        <Slot4x2 />
        <Slot2x1 />
        {postsSlots[1]}
        <Slot2x1 />
        {postsSlots[2]}
        <Slot4x2 />
        <SlotLTop />
        <SlotLLeft />
        <SlotLCenter />
      </>
    )
  },
  'square-rect-rect': function (postsSlots: ReactNode[]): ReactNode {
    return (
      <>
        <SlotTime />
        <Slot2x3 />
        {postsSlots[0]}
        <Slot1x3 />
        <Slot1x3 />
        {postsSlots[1]}
        <Slot2x3 />
        <Slot2x1 />
        <SlotLTop />
        {postsSlots[2]}
        <Slot2x2 />
        <SlotLLeft />
        <SlotLCenter />
        <Slot2x1 />
      </>
    )
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
    return (
      <>
        <SlotTime />
        {postsSlots[0]}
        <Slot1x3 />
        <Slot2x3 />
        <Slot3x3 />
        {postsSlots[1]}
        <Slot2x2 />
        {postsSlots[2]}
        <SlotLTop />
        <Slot2x2 />
        <SlotLLeft />
        <SlotLCenter />
      </>
    )
  },
  'rect-rect-square': function (postsSlots: ReactNode[]): ReactNode {
    return (
      <>
        <SlotTime />
        {postsSlots[0]}
        <Slot4x2 />
        {postsSlots[1]}
        <Slot2x2 />
        {postsSlots[2]}
        <SlotLTop />
        <Slot1x3 />
        <Slot3x3 />
        <Slot2x1 />
        <SlotLLeft />
        <SlotLCenter />
      </>
    )
  },
  'rect-rect-rect': function (postsSlots: ReactNode[]): ReactNode {
    return (
      <>
        <SlotTime />
        {postsSlots[0]}
        <Slot1x3 />
        <Slot3x3 />
        {postsSlots[1]}
        <Slot2x2 />
        {postsSlots[2]}
        <SlotLTop />
        <Slot2x3 />
        <Slot2x1 />
        <SlotLLeft />
        <SlotLCenter />
      </>
    )
  }
}

const lt = new LightningTime()

type ImageType = 'wide' | 'tall' | 'square'

const PROJECT_SLOT_CLASS: Record<ImageType, string> = {
  wide: 'col-span-4 row-span-4',
  tall: 'col-span-4 row-span-4 flex',
  square: 'col-span-6 row-span-3 flex'
}

// idk this is arbitrary
const postKey = (post: Post) => `${post.createdTime}-${post.username}`

const typeFromImg = (img: HTMLImageElement): ImageType => {
  const ratio = img.naturalWidth / img.naturalHeight
  if (ratio > 1.5) return 'wide'
  if (ratio < 0.7) return 'tall'
  return 'square'
}

/**
 * Wide or tall images become square cards
 * Square images become wide cards
 */
const shapeSeqFromImgTypes = (
  types: [ImageType, ImageType, ImageType]
): ShapeSequence => {
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

  const { lightningString } = useContext(TimeContext)

  const boltRef = useRef<HTMLImageElement>(null)
  const zapRef = useRef<HTMLImageElement>(null)
  const sparkRef = useRef<HTMLImageElement>(null)
  const imgRefs = [boltRef, zapRef, sparkRef]

  const { boltColor, zapColor, sparkColor } = lt.getColors(lightningString)
  // Reversed so rightmost project correspects to bolt etc...
  const colors = [sparkColor, zapColor, boltColor]

  /**
   * It is "impossible" to know an img's dimension given an url on first render
   * dimensions are only known after loading or placed in dom
   */
  const [imageTypes, setImageTypes] = useState<
    [ImageType, ImageType, ImageType]
  >(['wide', 'wide', 'wide']) // arbitrary default, but i guess most images are landscape

  useEffect(() => {
    if (boltRef.current === null) return
    if (zapRef.current === null) return
    if (sparkRef.current === null) return

    setImageTypes([
      typeFromImg(boltRef.current),
      typeFromImg(zapRef.current),
      typeFromImg(sparkRef.current)
    ])
  }, [boltRef.current])

  // console.log(imageTypes)
  const seq = shapeSeqFromImgTypes(imageTypes)

  // console.log('seq', seq)

  const postSlots = posts.map((post: Post, index) => (
    <SlotProject
      key={postKey(post)}
      imgSrc={post.attachments[0].url}
      desc={post.description}
      avatarSrc={post.avatar[0].url}
      username={post.username}
      style={{
        background: `#${colors[index]}`
      }}
      ref={imgRefs[index]}
      className={PROJECT_SLOT_CLASS[imageTypes[index]]}
    />
  ))

  return (
    <div className="max-h-screen aspect-[4/3] bg-stone-800 p-3 m-auto rounded-sm shadow-[10px_10_50px_10px_black]">
      <div className="h-full grid grid-cols-12 grid-rows-9 grid-flow-row-dense p-1 bg-stone-900 rounded-lg shadow-[inset_0_0_40px_20px_#080808]">
        {rendererFromSequence[seq](postSlots)}
      </div>
    </div>
  )
}

export default Bento

const s = () => {
  return {
    username: 'wide long' + Math.floor(Math.random() * 1000),
    avatar: [
      { url: 'https://avatars.githubusercontent.com/u/5734109?s=200&v=4' }
    ],
    description:
      'but this is even cooler and i spent more time to type an extra long description',
    attachments: [
      {
        url:
          Math.random() > 0.5
            ? 'https://media.discordapp.net/attachments/1020777328172859412/1068789112158556221/Screenshot_from_2023-01-28_00-43-03.png?width=1440&height=714'
            : 'https://media.discordapp.net/attachments/1052236377338683514/1070483168454524938/maybe.jpg?width=351&height=742'
      }
    ]
  }
}

const r = () => {
  return {
    username: 'square long' + Math.floor(Math.random() * 1000),
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
}

// const fallbackData = [r(), s(), s()]
// const fallbackData = [s(), s(), s()]
// const fallbackData = [s(), s(), r()]
// const fallbackData = [s(), r(), s()]
// const fallbackData = [r(), s(), r()]
const fallbackData = [r(), r(), r()]
