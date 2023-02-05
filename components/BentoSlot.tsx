import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type ImageType = 'wide' | 'tall' | 'square'

type DescType = 'short' | 'long'

// tall-short === tall-long

type SlotType = `${ImageType}-${DescType}`

type SlotStyle = {
  container?: string
  text?: string
  img?: string
}

const SLOT_STYLES: Record<SlotType, SlotStyle> = {
  'wide-short': {
    container: 'col-span-6 row-span-2 flex',
    text: 'basis-2/6',
    img: 'basis-4/6'
  },
  'wide-long': {
    container: 'col-span-4 row-span-4',
    text: '',
    img: ''
  },
  'tall-short': {
    container: 'col-span-2 row-span-6',
    text: '',
    img: ''
  },
  'tall-long': {
    container: 'col-span-4 row-span-4 flex',
    text: 'basis-1/2',
    img: 'basis-1/2'
  },
  'square-short': {
    container: 'col-span-3 row-span-5',
    text: '',
    img: ''
  },
  'square-long': {
    container: 'col-span-6 row-span-3 flex',
    text: 'basis-1/2',
    img: 'basis-1/2'
  }
}

type Props = {
  imgSrc: string
  desc: string
  avatarSrc: string
  username: string
  className?: string
  style?: React.CSSProperties
}

const BentoSlot = ({
  imgSrc,
  desc,
  avatarSrc,
  username,
  className,
  style
}: Props) => {
  const imgRef = useRef<HTMLImageElement>(null)

  const [slotClass, setSlotClass] = useState<SlotStyle>({})

  useLayoutEffect(() => {
    if (imgRef.current === null) return

    const ratio = imgRef.current.naturalWidth / imgRef.current.naturalHeight

    let imageKey: ImageType

    if (ratio > 1.2) {
      imageKey = 'wide'
    } else if (ratio < 0.8) {
      imageKey = 'tall'
    } else {
      imageKey = 'square'
    }

    const descKey: DescType = desc.length > 30 ? 'long' : 'short'

    setSlotClass(SLOT_STYLES[`${imageKey}-${descKey}` satisfies SlotType])
  }, [imgRef])

  console.log(username, slotClass)

  return (
    <div
      className={`overflow-clip ${slotClass.container} ${className}`}
      style={style}
      // style={{ boxShadow: 'inset 0 0 40px 20px black' }}
    >
      <div className={`${slotClass.img}`}>
        <img src={imgSrc} ref={imgRef} />
      </div>
      <div className={`p-3 ${slotClass.text}`}>
        <img className="inline w-10 rounded-full" src={avatarSrc} />
        <span className="font-bold text-white">{username}</span>
        <p className="font-medium text-gray-50">{desc}</p>
      </div>
    </div>
  )
}
export default BentoSlot
