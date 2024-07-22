"use client"
import FabricJSCanvas from '@/components/Canvas/FabricJsCanvas'
import DrawerContent from '@/components/DrawerContent/DrawerContent';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Box, Drawer } from '@mui/material';
import React, { useState } from 'react'

const Homepage = () => {
  const [activeSection, setActiveSection] = useState('shapes');
  const handleIconClick = (section:string) => {
    setActiveSection(section);
  };
  const [shape, setShape] = useState('');
  const [shapeOptions, setShapeOptions] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [recordingUrl,setRecordingUrl] = useState('');
  const handleAddRectangle = () => {
    setShape('rectangle');
    setShapeOptions({ left: 50, top: 50, fill: 'orange', width: 100, height: 60 });
    setImageUrl('')
  };

  const handleAddCircle = () => {
    setShape('circle');
    setShapeOptions({ left: 150, top: 150, fill: 'purple', radius: 50 });
    setImageUrl('')
  };

  const handleAddTriangle = () => {
    setShape('triangle');
    setShapeOptions({ left: 200, top: 200, fill: 'yellow', width: 80, height: 80 });
    setImageUrl('')
  };

  const handleAddImage = (url:string) => {
    setImageUrl(url);
  };
  const handleRecordingUrl = (url:string)=>{
     setRecordingUrl(url);
  }
  return (
    <div>
       <div className='flex flex-row'>
      <Sidebar onIconClick={handleIconClick} handleRecordingUrl={handleRecordingUrl}/>
      <div className='w-[20%] z-100 bg-[#f3e0d8] flex justify-center'>
        <DrawerContent activeSection={activeSection} handleAddRectangle={handleAddRectangle} handleAddCircle={handleAddCircle} handleAddTriange={handleAddTriangle} handleAddImage={handleAddImage}/>
      </div>
      <div className='flex justify-center items-center m-5'>
      <FabricJSCanvas shape={shape} shapeOptions={shapeOptions} imageUrl={imageUrl}/>
      </div>
      </div>
      {recordingUrl && (
        <div>
          <video controls src={recordingUrl} style={{ width: '100%' }} />
        </div>
      )}
    </div>
  )
}

export default Homepage