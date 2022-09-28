import { useSession, signIn, signOut } from 'next-auth/react'
export default function Component() {
  const { data: session } = useSession()
  if (session) {
    console.log(session)
    return (
      <>
        Signed in as {session.user.email} <br />
        <button
          className="border-4 border-red-500 rounded px-2"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      <button
        className="bg-amber-400 rounded p-2 font-bold shadow"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  )
}
