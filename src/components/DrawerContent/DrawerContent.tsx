"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Crop32Icon from "@mui/icons-material/Crop32";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import MediaCard from "../ImagesCard/ImagesCard";
import { axiosGet, axiosPost } from "@/services/Api/axios";
import { apiRouter } from "@/services/apiRouter";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
const ShapesContent = ({
  handleAddRectangle,
  handleAddCircle,
  handleAddTriange,
}: {
  handleAddRectangle: () => void;
  handleAddCircle: () => void;
  handleAddTriange: () => void;
}) => (
  <div className="w-full flex items-center flex-col">
    <Typography variant="h5" style={{ fontFamily: "Caveat, cursive" }}>
      Shapes
    </Typography>
    <div className="w-full flex flex-wrap">
      <div onClick={handleAddTriange} className="w-[45%] cursor-pointer">
        <ChangeHistoryIcon
          style={{ width: "100%", height: "100%", color: "orange" }}
        />
      </div>
      <div onClick={handleAddRectangle} className="w-[45%] cursor-pointer">
        <Crop32Icon style={{ width: "100%", height: "100%" }} />
      </div>
      <div onClick={handleAddCircle} className="w-[45%] cursor-pointer">
        <RadioButtonUncheckedIcon style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  </div>
);

const ImagesContent = ({
  handleAddImage,
}: {
  handleAddImage: (image: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [mediacontent, setMediaContent] = useState([]);
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      uploadImage(base64);
    }
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const GetMedia = async () => {
    setLoading(true);
    const storedUser = Cookies.get("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const url = `${apiRouter.MEDIA}/${user.userId}/image`;
    try {
      const GetMediaResponse:any = await axiosGet(url, {}, "application/json");
      if (GetMediaResponse.length > 0) {
        setMediaContent(GetMediaResponse);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const uploadImage = async (base64Image: any) => {
    const upload = apiRouter.MEDIA;
    setLoading(true);
    const data = {
      media: base64Image,
    };
    try {
      const UploadResponse:any = await axiosPost(
        upload,
        data,
        "application/json",
        null,
        "get"
      );
      if (UploadResponse.url) {
        GetMedia();
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    finally{
      setLoading(false);
    }
  };
  useEffect(()=>{
    GetMedia();
  },[])
  return (
    <div className="flex flex-col items-center">
      <Typography
        variant="h5"
        style={{ fontFamily: "Caveat, cursive" }}
        className="py-3"
      >
        Images
      </Typography>
      <div className="flex flex-wrap gap-x-2 gap-y-2 ml-3">
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          mediacontent.map((data, index) => (
            <div className="w-[45%] h-auto" key={index}>
              <MediaCard url={data.url} handleAddImage={handleAddImage} />
            </div>
          ))
        )}
      </div>
      <label className="bg-[#ffb62f] py-2 px-3 rounded-lg m-3 cursor-pointer">
        Upload Image
        <input type="file" accept="image/*" hidden onChange={handleFileChange} disabled={loading}/>
      </label>
    </div>
  );
};

const VideosContent = ({videos,showVideo}:{videos:any[],showVideo:(url:any)=>void}) => (
  <div className="flex flex-col items-center">
    <Typography variant="h6">Videos</Typography>
    <div className="flex flex-wrap gap-x-2 gap-y-2 ml-3">
    {videos.map((data, index) => (
            <div className="w-[45%] h-auto" key={index}>
            <video src={data} style={{ width: '100%' }}  onClick={()=>showVideo(data)} className="cursor-pointer"/>
            </div>
      ))}
      </div>
  </div>
);

const DrawerContent = ({
  activeSection,
  handleAddRectangle,
  handleAddCircle,
  handleAddTriange,
  handleAddImage,
  videos,
  showVideo,
}: {
  activeSection: string;
  handleAddRectangle: () => void;
  handleAddCircle: () => void;
  handleAddTriange: () => void;
  handleAddImage: (url: string) => void;
  videos:any[],
  showVideo:(url:any)=>void,
}) => {
  switch (activeSection) {
    case "shapes":
      return (
        <ShapesContent
          handleAddRectangle={handleAddRectangle}
          handleAddCircle={handleAddCircle}
          handleAddTriange={handleAddTriange}
        />
      );
    case "images":
      return <ImagesContent handleAddImage={handleAddImage} />;
    case "videos":
      return <VideosContent videos={videos} showVideo={showVideo}/>;
    default:
      return null;
  }
};

export default DrawerContent;
