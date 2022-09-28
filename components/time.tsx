import { useEffect, useState } from 'react'

const Time = () => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleString().split(', ')[1]),
      1000
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-amber-600 rounded-lg p-4">
        <h1 className="text-6xl font-bold">{time}</h1>
      </div>
    </div>
  )
}

export default Time
