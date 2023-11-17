import { useLightningTimeClock } from '@purduehackers/time/react'
import { createContext } from 'react'

export const LightningTimeContext = createContext({
  currentLightningTime: '0~0~0',
  currentNormalTime: '12:00 AM',
  currentColors: {
    boltColor: '#ffffff',
    zapColor: '#ffffff',
    sparkColor: '#ffffff'
  }
})

export const LightningTimeProvider = ({ ...props }) => {
  const { lightningTimeClock, normalTimeClock, timeColors } =
    useLightningTimeClock()

  const lightningTime = {
    currentLightningTime: lightningTimeClock,
    currentNormalTime: normalTimeClock,
    currentColors: timeColors
  }
  return (
    <LightningTimeContext.Provider value={lightningTime}>
      {props.children}
    </LightningTimeContext.Provider>
  )
}
