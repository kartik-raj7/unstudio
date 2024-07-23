import * as React from 'react';
import Card from '@mui/material/Card';
import Image from 'next/image';

export default function MediaCard({url,handleAddImage}:{url:string,handleAddImage:(image:string)=>void}) {
  return (
    <Card>
      <Image src={url} className='w-full h-full cursor-pointer' alt='image' width={100} height={100} onClick={()=>handleAddImage(url)}/>
    </Card>
  );
}