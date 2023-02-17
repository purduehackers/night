import Head from 'next/head'
import { Suspense } from 'react'
import { DoorbellContext, DoorbellButton } from '../components/doorbell'

export default function Page() {
  return (
    <main className="grid items-center min-h-screen bg-gray-900 text-white p-3">
      <Head>
        <title>Hack Night Doorbell</title>
      </Head>
      <Suspense>
        <DoorbellContext>
          <DoorbellButton />
        </DoorbellContext>
      </Suspense>
    </main>
  )
}
