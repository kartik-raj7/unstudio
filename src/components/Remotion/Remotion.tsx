import { Composition } from 'remotion';
import React, { useEffect, useState } from 'react';

export const RemotionPlayer = ({ VideoBlob }: { VideoBlob: Blob }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (VideoBlob) {
      const url = URL.createObjectURL(VideoBlob);
      setVideoUrl(url);
      return () => {
        if (url) URL.revokeObjectURL(url);
      };
    }
  }, [VideoBlob]);

  return (
    <>
      {videoUrl && (
        <Composition
          id="MainVideo"
          component={() => (
            <video src={videoUrl} autoPlay controls width={1920} height={1080} />
          )}
          durationInFrames={300}
          fps={30}
          width={1920}
          height={1080}
        />
      )}
    </>
  );
};
