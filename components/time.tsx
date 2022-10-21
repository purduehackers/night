import { useEffect, useState } from 'react'
import tt from 'tinytime'
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
      const colors = Object.values(lt.getColors(convertedTime))
      setLightningTime(convertedTime)

      const formattedTime = tt('{h}:{mm} {a}').render(now)
      setTime(formattedTime)
      document.documentElement.style.setProperty('--boltColor', `#${colors[0]}`)
      document.documentElement.style.setProperty('--zapColor', `#${colors[1]}`)
      document.documentElement.style.setProperty(
        '--sparkColor',
        `#${colors[2]}`
      )
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-rows-3 items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center">
        <EmojiMarquee />
        <h1 className="text-5xl font-bold">
          <img src="/ph-logo-cropped.png" className="inline-block h-[3.5rem]" />{' '}
          Hack Night 🌙
        </h1>
        <div className="flex flex-row gap-x-2">
          <h1 className="text-gray-300 text-3xl font-bold">0.5</h1>
          <div className="flex flex-col justify-center">
            <div className="bg-amber-400 text-black rounded px-1">
              <p className="text-sm font-bold">beta</p>
            </div>
          </div>
        </div>
        <EmojiMarquee />
      </div>
      <div className="flex flex-col items-center justify-center font-mono">
        <h1
          className={`text-[8vw] font-bold underline underline-offset-[12px] decoration-white decoration-dotted decoration-8 gradient-time`}
        >
          {lightningTime}
        </h1>
        <p className="font-bold text-2xl">({time})</p>
      </div>
    </div>
  )
}

export default Time
