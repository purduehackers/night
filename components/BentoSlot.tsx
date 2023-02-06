import { format } from 'date-fns'
import React, { RefObject, useContext } from 'react'
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
      <div className={`overflow-clip ${slotBase} ${className}`} style={style}>
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

const slotCommon = 'border-stone-600 border rounded-xl'
const slotBase = `${slotCommon} shadow-[inset_0_0_40px_20px_black] m-1`
const slotRed = `${slotBase} bg-red-900`

export const SlotTime = () => {
  const { lightningString, date } = useContext(TimeContext)
  const time = format(date, 'h:mm a')

  return (
    <div className={`col-span-6 row-span-3 overflow-clip p-3 ${slotRed}`}>
      <div className="flex gap-2 items-center">
        <img src="/ph-logo-cropped.png" className="inline h-14" />
        <div>
          <h1 className="flex gap-2 items-center text-3xl font-bold text-white">
            HACK NIGHT 1.3
          </h1>
          <span className="px-1 text-sm font-bold text-black rounded bg-amber-400">
            now with more fish!
          </span>
        </div>
      </div>
      <div className="text-center">
        <span
          className={`text-8xl font-bold underline underline-offset-[12px] text-amber-300 decoration-white decoration-dotted decoration-8`}
        >
          {lightningString}
        </span>
        <p className="mt-2 text-3xl text-white font-bold">({time})</p>
      </div>
    </div>
  )
}

export const Slot4x2 = () => {
  return <div className={`col-span-4 row-span-2 ${slotRed}`}></div>
}

export const Slot1x3 = () => {
  return <div className={`col-span-1 row-span-3 ${slotRed}`}></div>
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

export const Slot2x2 = () => {
  return <div className={`col-span-2 row-span-2 ${slotRed}`}></div>
}

export const Slot3x3 = () => {
  return <div className={`col-span-3 row-span-3 ${slotRed}`}></div>
}

export const Slot2x3 = () => {
  return <div className={`col-span-2 row-span-3 ${slotRed}`}></div>
}

export const SlotLTop = () => {
  return (
    <div
      className={`col-span-2 row-span-2 m-1 mb-0 border-b-0 rounded-b-none shadow-[inset_-20px_20px_40px_5px_black_,_inset_20px_-20px_40px_5px_#1c1917] ${slotCommon}`}
    ></div>
  )
}
export const SlotLLeft = () => {
  return (
    <div
      className={`col-span-2 row-span-2 m-1 mr-0 border-r-0 rounded-r-none shadow-[inset_20px_-20px_40px_5px_black_,_inset_-20px_20px_40px_5px_#1c1917] ${slotCommon}`}
    ></div>
  )
}
export const SlotLCenter = () => {
  return (
    <div
      className={`col-span-2 row-span-2 m-1 mt-0 ml-0 border-t-0 border-l-0 rounded-t-none rounded-l-none shadow-[inset_-20px_-20px_40px_5px_black_,_inset_20px_20px_40px_5px_#1c1917] ${slotCommon}`}
    ></div>
  )
}
