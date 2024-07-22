"use client"
import Image from 'next/image';
import React from 'react';
import { Caveat } from 'next/font/google';
import SigninButton from '../SignInButton/SigninButton';
import { useSession } from 'next-auth/react';

const caveat = Caveat({ subsets: ['latin'] });

const Navbar = () => {
  return (
      <div className="flex justify-between items-center p-4 bg-[#e1d2f8] bg-opacity-50 backdrop-blur-md">
      <div className='flex flex-row  items-center sm:w-1/4'>
      <div><Image src="/unstudio.png" alt="logo" height="30" width="30" /></div>
      <div style={{ fontFamily: 'Caveat, cursive' }} className='text-2xl'>Unstudio</div>
      </div>
      <div className="flex items-center">
       <SigninButton/>
      </div>
    </div>
  );
};

export default Navbar;
