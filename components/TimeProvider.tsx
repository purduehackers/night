import { createContext, ReactNode, useEffect, useState } from 'react'

import { LightningTime } from '@purduehackers/time'

type TimeContextValue = {
  lightningString: string
  /** NOTE: Only accurate to within 1.5s */
  date: Date
}

export const TimeContext = createContext<TimeContextValue>({
  lightningString: 'This default value is never used',
  date: new Date()
})

const lt = new LightningTime()

type Props = {
  children: ReactNode
}

/**
 * Using this context will cause a rerender every 1.5s
 */
export const TimeContextProvider = ({ children }: Props) => {
  const [value, setValue] = useState<TimeContextValue>({
    lightningString: lt.convertToLightning(new Date()).lightningString,
    date: new Date()
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const newDate = new Date()
      const newLightning = lt.convertToLightning(newDate).lightningString

      setValue((oldValue) => {
        if (oldValue.lightningString === newLightning) return oldValue

        return {
          lightningString: newLightning,
          date: newDate
        }
      })
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>
}
