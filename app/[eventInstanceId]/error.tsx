'use client'

import { useEffect } from 'react'
import errorAnimation from '@/lotties/error.json'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center p-4'>
      <Lottie
        animationData={errorAnimation}
        loop={true}
        className='w-48 h-48'
      />
      <h2 className='text-2xl font-bold mb-2'>Oops! Something went wrong.</h2>
      <p className='text-center text-gray-500 mb-4'>
        We&apos;re really sorry about that. Try refreshing the page, or come
        back a bit later
      </p>
      <Button
        size='lg'
        className='uppercase font-bold cursor-pointer'
        onClick={() => window.location.reload()}
      >
        Try again
      </Button>
    </div>
  )
}
