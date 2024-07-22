import React from 'react'
import Navbar from '../Navbar/Navbar'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

const Hero = () => {
  const { data: session } = useSession();
  return (
        <>
        <div className='flex justify-between'>
        <div className="flex justify-center flex-col w-full h-[90vh]">
        <div className='text-7xl px-8 py-4 pt-8 w-[43%]'>Photoshoots made <span className='text-[#e1d2f8]'>Simple</span></div>
        <div className='text-2xl px-8 p-2'>Create studio-quality pictures with artificial intelligence.</div>
        <div className='px-8 p-2'>
        {session?.user?
        <button onClick={() => signOut({ callbackUrl: '/' })} className='px-5 py-2 bg-[#f4d6ca] rounded-lg mr-3'>Sign Out</button>:
        <button onClick={() => signIn()} className='px-5 py-2 bg-[#e1d2f8] rounded-lg mr-3'>Sign In</button>}
        </div>
        </div>
        <div className='mr-14 flex justify-center items-center'><Image src='/camera.svg' alt='camera' width='300' height='300'/></div>
        </div>
        </>
  )
}

export default Hero