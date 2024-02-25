import React, { useState, useEffect } from 'react';
import config from '../services/config.json'
import { Loading } from './Loading';
import { VideoItem } from './VideoItem';
import { LikeButton } from './LikeButton';

export const VideoList = ({ videoIds }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const promises = videoIds.map(async (videoId) => {
          const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${config.youtubeApiKey}`
          );
          const data = await response.json();
          return data.items[0];
        });

        const fetchedVideos = await Promise.all(promises);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [videoIds]);

  if (videos.length === 0) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap">
      {videos.map((video) => (
        <div key={video.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
          <VideoItem video={video} />
          {/* <VideoItemHover video={video}/> */}
          <LikeButton videoId={video.id} />
        </div>
      ))}
    </div>
  );
};

