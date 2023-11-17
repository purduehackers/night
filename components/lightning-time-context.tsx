import { LightningTime } from '@purduehackers/time'
import { useLightningTimeClock } from '@purduehackers/time/react'
import { createContext } from 'react'

const { lightningString, colors } = new LightningTime().convertToLightning(
  new Date()
)

export const LightningTimeContext = createContext({
  currentLightningTime: lightningString,
  currentNormalTime: '',
  currentColors: colors
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
