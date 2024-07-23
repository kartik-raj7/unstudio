"use client"
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InterestsIcon from '@mui/icons-material/Interests';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Tooltip } from '@mui/material';;
import RecordRTC,{invokeSaveAsDialog} from "recordrtc";
import { axiosPost } from '@/services/Api/axios';
import { toast } from 'react-toastify';
import { apiRouter } from '@/services/apiRouter';
const Sidebar = ({ onIconClick,handleRecordingUrl }:any) => {
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const recorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const refVideo = useRef(null);
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 1920,
        height: 1080,
        frameRate: 30,
      },
      audio: false,
    });
    setStream(mediaStream);
    setIsRecording(true);
    recorderRef.current = new RecordRTC(mediaStream, { type: 'video' });
    recorderRef.current.startRecording();
  };

  const stopRecording = async () => {
    recorderRef.current.stopRecording(async () => {
       setBlob(recorderRef.current.getBlob());
       uploadVideo(recorderRef.current.getBlob());
       handleRecordingUrl(URL.createObjectURL(recorderRef.current.getBlob()))
    });
    // const base64Video = await convertToBase64(blob);
    setIsRecording(false);
    //  uploadVideo(base64Video)
  };
  
  const convertToBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const uploadVideo = async (blob: any) => {
    const upload = apiRouter.MEDIA;
    // const data = {
    //   media: base64Image,
    // };
  const formData = new FormData();
  formData.append('file', blob, 'video.webm');
    try {
      const UploadResponse = await axiosPost(
        upload,
        formData,
        "multipart/form-data",
        null,
        "get"
      );
      if (UploadResponse.url) {
        toast.success("Video uploaded successfully");
        handleRecordingUrl(true)
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    finally{
    }
  };
  useEffect(() => {
    if (!refVideo.current) {
      return;
    }

    // refVideo.current.srcObject = stream;
  }, [stream, refVideo]);
  return (
    <div style={{ width: 50, height: '90vh'}} className='bg-[#e1d2f8] bg-opacity-50'>
      <IconButton onClick={() => onIconClick('shapes')}>
        <InterestsIcon />
      </IconButton>
      <IconButton onClick={() => onIconClick('images')}>
        <PermMediaIcon />
      </IconButton>
      <IconButton onClick={() => onIconClick('videos')}>
        <VideoCameraBackIcon />
      </IconButton>
      <IconButton onClick={startRecording} disabled={isRecording}>
        <Tooltip title='Start Recording'>
        <RadioButtonCheckedIcon className={`text-red-500 ${isRecording ? 'blinking' : ''}`} />
        </Tooltip>
      </IconButton>
      <IconButton onClick={stopRecording} >
      <Tooltip title='Stop Recording'>
        <RadioButtonUncheckedIcon className='text-black'/>
      </Tooltip>
      </IconButton>
    </div>
  );
};

export default Sidebar;
