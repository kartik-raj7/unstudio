"use client"
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InterestsIcon from '@mui/icons-material/Interests';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Button, CircularProgress, Modal, Tooltip, Typography } from '@mui/material';;
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
  const [modal,setModal] = useState(false);
  const [loading,setLoading] = useState(false);
  const [uploadedVideoUrl,setUploadedVideoUrl] = useState('');
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
    setIsRecording(false);
  };
  const closeModal=()=>{
    setModal(false);
    setUploadedVideoUrl('');
  }
  const uploadVideo = async (media: any) => {
  const upload = apiRouter.VIDEO;
  const formData = new FormData();
  setModal(true);
  setLoading(true);
  formData.append('media', media);
    try {
      const UploadResponse = await axiosPost(
        upload,
        formData,
        "multipart/form-data",
        null,
        "get"
      );
      console.log(UploadResponse.data.url)
      if (UploadResponse.data.url) {
        setUploadedVideoUrl(UploadResponse.data.url);
        toast.success("Video uploaded successfully");
        handleRecordingUrl(true);
      } else {
        toast.error("Something went wrong");
        setModal(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setModal(false);
    }
    finally{
    setLoading(false);
    }
  };
  useEffect(() => {
    if (!refVideo.current) {
      return;
    }
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
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #e1d2fb',
            boxShadow: 24,
            p: 4,
            borderRadius:'10px'
          }}
        >
          {loading ? (
            <Box textAlign="center">
              <CircularProgress />
              <Typography variant="h6" component="div">Uploading...</Typography>
            </Box>
          ) : (
            <Box>
              <Typography id="modal-title" variant="h6" component="h2">
                Video Uploaded Successfully
              </Typography>
              <Typography id="modal-description"  sx={{ my: 2, wordBreak: 'break-all' }}>
                <a href={uploadedVideoUrl} target="_blank" rel="noopener noreferrer" style={{ overflowWrap: 'break-word' }}>{uploadedVideoUrl}</a>
              </Typography>
              <Button
                variant="contained"
                className='bg-[#e1d2fb]'
                onClick={() => navigator.clipboard.writeText(uploadedVideoUrl)}
              >
                Copy URL
              </Button>
              <Button
                variant="outlined"
                onClick={closeModal}
                sx={{ ml: 2 ,backgroundColor:'#e38181',color:'black'}}
              >
                Close
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Sidebar;
