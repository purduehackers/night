import { useLightningTimeClock } from '@purduehackers/time/react'
import { createContext } from 'react'

export const LightningTimeContext = createContext({
  currentLightningTime: '',
  currentNormalTime: '',
  currentColors: {
    boltColor: '',
    zapColor: '',
    sparkColor: ''
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
