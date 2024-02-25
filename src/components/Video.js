import React, { useState, useEffect } from 'react';
import { VideoList } from './VideoList';
import config from '../services/config.json';

export const Video = () => {
  const [videoIds, setVideoIds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoIds = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=id&type=video&q=snippet&key=${config.youtubeApiKey}&maxResults=10`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch video IDs');
        }

        const data = await response.json();
        const ids = data.items.map((item) => item.id.videoId);
        setVideoIds(ids);
      } catch (error) {
        console.error('Error fetching video IDs:', error);
        setError('Failed to fetch video IDs. Please try again later.');
      }
    };

    fetchVideoIds();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <VideoList videoIds={videoIds} />
  );
};