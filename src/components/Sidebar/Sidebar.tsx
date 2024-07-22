"use client"
import React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InterestsIcon from '@mui/icons-material/Interests';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Tooltip } from '@mui/material';;
import RecordRTC from "recordrtc";
const Sidebar = ({ onIconClick,handleRecordingUrl }:any) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingUrl, setRecordingUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const recorder = RecordRTC(stream, { type: 'video' });
    setMediaRecorder(recorder);
    recorder.startRecording();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder?.stopRecording(() => {
      const url = mediaRecorder?.toURL();
      setRecordingUrl(url);
      handleRecordingUrl(url)
      setIsRecording(false);
    });
  };
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
