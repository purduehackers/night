import { signOut } from 'next-auth/react'

const Grid3 = () => {
  return (
    <div className="ml-auto mr-4 mt-2">
      <button
        className="bg-green-500 rounded-lg p-2 font-bold shadow-lg text-black"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  )
}

export default Grid3
