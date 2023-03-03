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
    <div className="grid items-end justify-center w-full grid-rows-3">
      <div className="flex flex-col items-center justify-center my-4">
        <EmojiMarquee />
        <h1 className="text-4xl font-bold">
          <img src="/ph-logo-cropped.png" className="inline-block h-[3.5rem]" />{' '}
          HACK NIGHT
        </h1>
        <div className="flex flex-row gap-x-2">
          <h1 className="text-3xl font-bold text-gray-300">2.2</h1>
          <div className="flex flex-row items-center gap-1">
            <div className="px-1 text-black rounded bg-orange-400">
              <p className="text-sm font-bold">now 1000000x brighter!</p>
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
        <p className="text-2xl font-bold">({time})</p>
      </div>
    </div>
  )
}

export default Time
