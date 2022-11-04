import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { LightningTime } from '@purduehackers/time'
import EmojiMarquee from './emoji-marquee'

const Time = () => {
  const [time, setTime] = useState('')
  const [lightningTime, setLightningTime] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()

      const lt = new LightningTime()
      const convertedTime = lt.convertToLightning(now).lightningString
      setLightningTime(convertedTime)

      const formattedTime = format(now, 'h:mm a')
      setTime(formattedTime)
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-rows-3 items-end justify-center w-full">
      <div className="flex flex-col items-center justify-center my-4">
        <EmojiMarquee />
        <h1 className="text-5xl font-bold">
          <img src="/ph-logo-cropped.png" className="inline-block h-[3.5rem]" />{' '}
          Hack Night 🌙
        </h1>
        <div className="flex flex-row gap-x-2">
          <h1 className="text-gray-300 text-3xl font-bold">1.0</h1>
          <div className="flex flex-row gap-1 items-center">
            <div className="bg-amber-400 text-black rounded px-1">
              <p className="text-sm font-bold">stable</p>
            </div>
            <div className="bg-blue-300 text-black rounded px-1">
              <p className="text-sm font-bold">fishy</p>
            </div>
          </div>
        </div>
        <EmojiMarquee />
      </div>
      <div className="flex flex-col items-center font-mono">
        <h1
          className={`text-[8vw] font-bold underline underline-offset-[12px] text-amber-300 decoration-white decoration-dotted decoration-8`}
        >
          {lightningTime}
        </h1>
        <p className="font-bold text-2xl">({time})</p>
      </div>
    </div>
  )
}

export default Time
