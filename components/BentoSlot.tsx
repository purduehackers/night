import React, { RefObject } from 'react'
import { useRef } from 'react'

type Props = {
  imgSrc: string
  desc: string
  avatarSrc: string
  username: string
  className?: string
  style?: React.CSSProperties
  // imgRef: RefObject<HTMLImageElement>
}

export const SlotProject = React.forwardRef<HTMLImageElement, Props>(
  ({ imgSrc, desc, avatarSrc, username, className, style }, ref) => {
    return (
      <div className={`overflow-clip ${slotClass} ${className}`} style={style}>
        <div className="basis-1/2">
          <img src={imgSrc} ref={ref} />
        </div>
        <div className="p-s basis-1/2">
          <img className="inline w-10 rounded-full" src={avatarSrc} />
          <span className="font-bold text-white">{username}</span>
          <p className="font-medium text-gray-50">{desc}</p>
        </div>
      </div>
    )
  }
)

const slotCommon = 'border-stone-600 border rounded-xl'
const slotClass = `${slotCommon} shadow-[inset_0_0_40px_20px_black] m-1`

export const SlotTime = () => {
  return <div className={`col-span-6 row-span-3 ${slotClass}`}></div>
}

export const Slot4x2 = () => {
  return <div className={`col-span-4 row-span-2 ${slotClass}`}></div>
}

export const Slot1x3 = () => {
  return <div className={`col-span-1 row-span-3 ${slotClass}`}></div>
}

export const Slot2x1 = () => {
  return <div className={`col-span-2 row-span-1 ${slotClass}`}></div>
}

export const Slot2x2 = () => {
  return <div className={`col-span-2 row-span-2 ${slotClass}`}></div>
}

export const Slot3x3 = () => {
  return <div className={`col-span-3 row-span-3 ${slotClass}`}></div>
}

export const Slot2x3 = () => {
  return <div className={`col-span-2 row-span-3 ${slotClass}`}></div>
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
