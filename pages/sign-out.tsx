import { signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const SignOut = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/?signOut=true')
  }, [])
  return <p>Signing out...</p>
}

export default SignOut
