import {
  RoomProvider,
  useRoom,
  useStorage,
  useMutation
} from '../liveblocks.config'
import { useEffect, type PropsWithChildren } from 'react'
import useSound from 'use-sound'

export function DoorbellButton() {
  const room = useRoom()
  const ringing = useStorage((root) => root.ringing)
  const [play] = useSound('/doorbell.mp3')

  const ringTheBell = useMutation(({ storage }) => {
    const newValue = !storage.get('ringing')
    storage.set('ringing', newValue)
  }, [])

  useEffect(() => {
    if (ringing) {
      play()
    }
  }, [ringing])

  const connection = room.getConnectionState()
  const buttonLabel = ['connecting', 'authenticating'].includes(connection)
    ? 'Wiring up…'
    : connection === 'open'
    ? ringing
      ? 'Ringing…'
      : 'Ring the doorbell'
    : 'Bzzt! Error.'

  return (
    <div className="text-center py-4" suppressHydrationWarning>
      <button
        className="bg-pink-500 aspect-square rounded-full [width:10ch] [border-bottom-width:12px] border-pink-600 active:border-b-4 p-6 font-bold text-4xl shadow-xl [text-shadow:-1px_-1px_#00000052] relative z-10"
        aria-pressed={!!ringing}
        onClick={ringTheBell}
        disabled={connection !== 'open'}
      >
        {buttonLabel}
      </button>
      {['failed', 'unavailable', 'closed'].includes(connection) && (
        <p className="mt-6">
          <a href="mailto:mstanciu@purdue.edu" className="text-white underline">
            <strong>Email Matthew</strong> to let you in
          </a>
        </p>
      )}
    </div>
  )
}

export function DoorbellCard() {
  const room = useRoom()
  const ringing = useStorage((root) => root.ringing)
  const [play] = useSound('/doorbell.mp3', { volume: 0.67 })

  useEffect(() => {
    if (ringing) {
      play()
    }
  }, [ringing])

  const connection = room.getConnectionState()
  const connectionLabel = ['connecting', 'authenticating'].includes(connection)
    ? 'Wiring up…'
    : connection === 'open'
    ? 'Connected'
    : 'Bzzt! Error.'

  return (
    <div className="text-center py-4" suppressHydrationWarning>
      {ringing && (
        <>
          <div className="animate-pulse absolute inset-0 w-full h-full bg-pink-500 opacity-30 pointer-events-none"></div>
          <mark className="bg-pink-500 text-white rounded-lg shadow-2xl text-4xl font-bold animate-bounce p-4">
            Someone’s at the door!
          </mark>
        </>
      )}
      <p className="text-white/50">Doorbell connection: {connectionLabel}</p>
    </div>
  )
}

export function DoorbellContext({ children }: PropsWithChildren<{}>) {
  return (
    <RoomProvider
      id="doorbell"
      initialPresence={{}}
      initialStorage={{ ringing: false }}
    >
      {typeof window === 'undefined' ? null : children}
    </RoomProvider>
  )
}
