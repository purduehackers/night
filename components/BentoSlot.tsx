import { format } from 'date-fns'
import React, { useContext } from 'react'
import { DataContext } from './DataProvider'

import { TimeContext } from './TimeProvider'

type Props = {
  imgSrc: string
  desc: string
  avatarSrc: string
  username: string
  className?: string
  style?: React.CSSProperties
}

export const SlotProject = React.forwardRef<HTMLImageElement, Props>(
  ({ imgSrc, desc, avatarSrc, username, className, style }, ref) => {
    return (
      <div className={`${slotBase} ${className}`} style={style}>
        <div className="basis-1/2">
          <img src={imgSrc} ref={ref} />
        </div>
        <div className="p-3 basis-1/2">
          <img className="inline w-10 rounded-full" src={avatarSrc} />
          <span className="font-bold text-white">{username}</span>
          <p className="font-medium text-gray-50">{desc}</p>
        </div>
      </div>
    )
  }
)

const slotBase = `border-stone-600 border rounded-xl overflow-clip shadow-[inset_0_0_20px_10px_black] m-1`
const slotRed = `${slotBase} bg-red-900`

export const SlotTime = () => {
  const { lightningString, date } = useContext(TimeContext)
  const time = format(date, 'h:mm a')

  return (
    <div
      className={`col-span-6 row-span-3 p-3 flex flex-col justify-around ${slotRed}`}
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/00/79/54/60/360_F_79546022_4j5WwFYNcsiaywekL9sF340RTQ1A85I3.jpg')"
      }}
    >
      <div className="flex gap-2 items-center">
        <img src="/ph-logo-cropped.png" className="inline h-14" />
        <div>
          <h1 className="text-2xl font-bold text-black">HACK NIGHT 1.3</h1>
          <span className="px-1 text-sm font-bold text-black rounded bg-amber-400">
            now with more fish!
          </span>
        </div>
      </div>
      <div className="text-center">
        <span
          className={`text-8xl font-bold underline underline-offset-[12px] text-amber-300 decoration-black decoration-dotted decoration-8`}
          style={{ textShadow: '1px 1px 8px black' }}
        >
          {lightningString}
        </span>
        <p className="mt-2 text-3xl text-black font-bold">({time})</p>
      </div>
    </div>
  )
}

export const Slot4x2 = () => {
  return (
    <div className={`col-span-4 row-span-2 ${slotRed} overflow-visible`}>
      <img src="./omelette_h.png" className="z-50 relative w-full"></img>
    </div>
  )
}

export const Slot2x4 = () => {
  return (
    <div className={`col-span-2 row-span-4 ${slotRed} overflow-visible`}>
      <img src="./omelette_v.png" className="z-50 relative w-full -mt-4"></img>
    </div>
  )
}

export const Slot4x2Spotify = () => {
  const { songData } = useContext(DataContext)
  return (
    <div className={`col-span-4 row-span-2 ${slotRed} flex`}>
      <img src={songData.image} className="rounded-lg" />
      <div className="p-2">
        <p className="font-bold text-3xl text-white">{songData.title}</p>
        <p className="text-xl text-gray-300">{songData.artist}</p>
      </div>
    </div>
  )
}

export const Slot2x1 = () => {
  return (
    <div className={`col-span-2 row-span-1 ${slotRed}`}>
      <img
        className="h-full object-contain"
        src="https://cdn.discordapp.com/attachments/1020777328172859412/1071256449931542628/JoelPride.gif"
      />
    </div>
  )
}

export const SlotFOD = () => {
  const { fishData } = useContext(DataContext)
  return (
    <div className={`col-span-4 row-span-3 ${slotRed}`}>
      <img className="h-full object-contain" src={fishData.url} />
    </div>
  )
}

export const Slot2x2 = () => {
  return (
    <div className={`col-span-2 row-span-2 ${slotRed} overflow-visible`}>
      <img
        src="./broccoli.png"
        className="z-50 relative"
        style={{ width: '150%', maxWidth: 'unset', margin: '-25%' }}
      ></img>
    </div>
  )
}

export const Slot2x3Spotify = () => {
  const { songData } = useContext(DataContext)
  return (
    <div className={`col-span-2 row-span-3 ${slotRed}`}>
      <img src={songData.image} className="rounded-lg" />
      <div className="p-2">
        <p className="font-bold text-xl text-white">{songData.title}</p>
        <p className="text-xl text-gray-300">{songData.artist}</p>
      </div>
    </div>
  )
}

export const Slot2x3Tempura = () => {
  return (
    <div className={`col-span-2 row-span-3 ${slotRed} overflow-visible`}>
      <img src="./octopus.png" className="z-50 relative -mt-4 w-100"></img>
    </div>
  )
}

export const Slot2x3Octopus = () => {
  return (
    <div className={`col-span-2 row-span-3 ${slotRed} overflow-visible`}>
      <img src="./tempura.png" className="z-50 relative w-100"></img>
    </div>
  )
}
