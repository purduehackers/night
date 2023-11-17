import { useContext } from 'react'
import EmojiMarquee from './emoji-marquee'
import { LightningTimeContext } from './lightning-time-context'
import Image from 'next/image'
import phLogo from '../public/ph-logo-cropped.png'

const Time = () => {
  const { currentLightningTime, currentNormalTime } =
    useContext(LightningTimeContext)

  return (
    <div className="grid items-end justify-center w-full grid-rows-3">
      <div className="flex flex-col items-center justify-center my-4">
        <EmojiMarquee />
        <h1 className="text-4xl font-bold">
          <Image
            priority
            alt="purdue hackers logo"
            src={phLogo}
            placeholder="blur"
            className="inline-block h-[3.5rem] w-auto"
          />{' '}
          HACK NIGHT
        </h1>
        <div className="flex flex-row gap-x-2">
          <h1 className="text-3xl font-bold text-gray-300">3.9</h1>
          <div className="flex flex-row items-center gap-1">
            <div className="px-1 text-white rounded bg-blue-500">
              <p className="text-sm font-bold">now with more superpowers!</p>
            </div>
          </div>
        </div>
        <EmojiMarquee />
      </div>
      <div className="flex flex-col items-center font-mono">
        <h1
          className={`text-[8vw] font-bold underline underline-offset-[12px] text-amber-300 decoration-white decoration-dotted decoration-8`}
          suppressHydrationWarning
        >
          {currentLightningTime}
        </h1>
        <p className="text-2xl font-bold" suppressHydrationWarning>
          ({currentNormalTime})
        </p>
      </div>
    </div>
  )
}

export default Time
