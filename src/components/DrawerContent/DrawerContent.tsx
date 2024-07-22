import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Crop32Icon from '@mui/icons-material/Crop32';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MediaCard from '../ImagesCard/ImagesCard';
const ShapesContent = ({handleAddRectangle,handleAddCircle,handleAddTriange}:{handleAddRectangle:()=>void,handleAddCircle:()=>void,handleAddTriange:()=>void}) => (
  <div className='w-full flex items-center flex-col'>
    <Typography variant="h5" style={{ fontFamily: 'Caveat, cursive' }}>Shapes</Typography>
    <div className='w-full flex flex-wrap'>
    <div onClick={handleAddTriange} className='w-[45%] cursor-pointer'><ChangeHistoryIcon style={{width:'100%', height:'100%',color:'orange'}}/></div>
    <div onClick={handleAddRectangle} className='w-[45%] cursor-pointer'><Crop32Icon style={{width:'100%', height:'100%'}}/></div>
    <div onClick={handleAddCircle} className='w-[45%] cursor-pointer'><RadioButtonUncheckedIcon style={{width:'100%', height:'100%'}}/></div>
    </div>
  </div>
);

const ImagesContent = ({handleAddImage}:{handleAddImage:(image:string)=>void}) => (
  //get images//
  <div className='flex flex-col items-center'>
    <Typography variant="h5" style={{ fontFamily: 'Caveat, cursive' }} className='py-3'>Images</Typography>
    <div className='flex flex-wrap justify-evenly gap-y-2'>
    <div className='w-[45%] h-auto'>
    <MediaCard url='/unstudio.png' handleAddImage={handleAddImage}/>
    </div>
    <div className='w-[45%] h-auto'>
    <MediaCard url='/unstudio.png' handleAddImage={handleAddImage}/>
    </div>
    <div className='w-[45%] h-auto'>
    <MediaCard url='/unstudio.png' handleAddImage={handleAddImage}/>
    </div>
    <div className='w-[45%] h-auto'>
    <MediaCard url='/unstudio.png' handleAddImage={handleAddImage}/>
    </div>
    </div>
    <button className='bg-[#ffb62f] py-2 px-3 rounded-lg m-3'>
      Upload Image
      <input type="file" hidden />
    </button>
    {/* Your image gallery goes here */}
  </div>
);

const VideosContent = () => (
  <Box>
    <Typography variant="h6">Videos</Typography>
    {/* Your video list goes here */}
  </Box>
);

const DrawerContent = ({ activeSection,handleAddRectangle,handleAddCircle,handleAddTriange,handleAddImage}:{activeSection:string,handleAddRectangle:()=>void,handleAddCircle:()=>void,handleAddTriange:()=>void,handleAddImage:(url:string)=>void}) => {
  switch (activeSection) {
    case 'shapes':
      return <ShapesContent handleAddRectangle={handleAddRectangle} handleAddCircle={handleAddCircle} handleAddTriange={handleAddTriange}/>;
    case 'images':
      return <ImagesContent handleAddImage={handleAddImage}/>;
    case 'videos':
      return <VideosContent />;
    default:
      return null;
  }
};

export default DrawerContent;
