import { useEffect, useState } from 'react'
import tt from 'tinytime'

const Time = () => {
  const [time, setTime] = useState('')
  const [dateObj, setDateObj] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setDateObj(now)
      //now.setHours(now.getHours() + 9)
      const formattedTime = tt('{h}:{mm} {a}').render(now)
      setTime(formattedTime)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full tabular-nums">
      <h1
        className={`${
          dateObj.getHours() > 22 || dateObj.getHours() === 0
            ? 'text-[7vw]'
            : 'text-[8vw]'
        } font-bold underline underline-offset-[12px] text-amber-300 decoration-white decoration-dotted decoration-8`}
      >
        {time}
      </h1>
    </div>
  )
}

export default Time
