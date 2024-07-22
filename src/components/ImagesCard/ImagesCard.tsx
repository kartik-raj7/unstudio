import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';

export default function MediaCard({url,handleAddImage}:{url:string,handleAddImage:(image:string)=>void}) {
  return (
    <Card>
      <Image src={url} className='w-full h-full' alt='image' width={100} height={100} onClick={()=>handleAddImage(url)}/>
    </Card>
  );
}