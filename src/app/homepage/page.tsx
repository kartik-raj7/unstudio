"use client";
import FabricJSCanvas from "@/components/Canvas/FabricJsCanvas";
import DrawerContent from "@/components/DrawerContent/DrawerContent";
import Sidebar from "@/components/Sidebar/Sidebar";
import { axiosGet } from "@/services/Api/axios";
import { apiRouter } from "@/services/apiRouter";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import VideoPlayer  from "@/components/Remotion/Videoplayer";
const Homepage = () => {
  const [activeSection, setActiveSection] = useState("shapes");
  const [videoUrl, setVideoUrl] = useState('');
  const [renderRemotion, setRenderRemotion] = useState(false);
  const handleIconClick = (section: string) => {
    setActiveSection(section);
  };
  const [shape, setShape] = useState("");
  const [shapeOptions, setShapeOptions] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [recordingUrls, setRecordingUrls] = useState<any[]>([]);
  const handleAddRectangle = () => {
    setShape("rectangle");
    setShapeOptions({
      left: 50,
      top: 50,
      fill: "orange",
      width: 100,
      height: 60,
    });
    setImageUrl("");
  };

  const handleAddCircle = () => {
    setShape("circle");
    setShapeOptions({ left: 150, top: 150, fill: "purple", radius: 50 });
    setImageUrl("");
  };

  const handleAddTriangle = () => {
    setShape("triangle");
    setShapeOptions({
      left: 200,
      top: 200,
      fill: "yellow",
      width: 80,
      height: 80,
    });
    setImageUrl("");
  };

  const handleAddImage = (url: string) => {
    setImageUrl(url);
    setShape('');
  };
  const handleRecordingUrl = (url: any) => {
    setRecordingUrls((prevUrls) => [...prevUrls, url]);
  };
  const GetMedia = async () => {
    const storedUser = Cookies.get("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const url = `${apiRouter.MEDIA}/${user.userId}/video`;
    try {
      const GetMediaResponse = await axiosGet(url, {}, "application/json");
      // if (GetMediaResponse.length > 0) {
      //   setMediaContent(GetMediaResponse);
      // } else {
      // }
    } catch (error) {
    } finally {
      // setLoading(false);
    }
  };
  const showVideo=(url: string)=> {
    setVideoUrl(url);
    setRenderRemotion(true);
  }
  const showCanvas=()=>{
    setRenderRemotion(false);
  }

  return (
    <div>
      <div className="flex flex-row">
        <ToastContainer />
        <Sidebar
          onIconClick={handleIconClick}
          handleRecordingUrl={handleRecordingUrl}
        />
        <div className="w-[20%] z-100 bg-[#f3e0d8] flex justify-center">
          <DrawerContent
            activeSection={activeSection}
            handleAddRectangle={handleAddRectangle}
            handleAddCircle={handleAddCircle}
            handleAddTriange={handleAddTriangle}
            handleAddImage={handleAddImage}
            videos={recordingUrls}
            showVideo = {showVideo}
          />
        </div>
        <div className="flex-1 flex justify-center items-center m-5">
          {!renderRemotion?<FabricJSCanvas
            shape={shape}
            shapeOptions={shapeOptions}
            imageUrl={imageUrl}
          />:
          <>
          <div className="flex flex-col">
          <div onClick={showCanvas} className="font-4xl flex justify-end font-bold cursor-pointer">X</div>
          <VideoPlayer url={videoUrl}/>
          </div>
          </>}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
