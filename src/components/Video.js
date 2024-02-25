import React ,{useState, useEffect }from 'react'
import { VideoList } from './VideoList';
import config from '../services/config.json'

export const Video = () => {
  const [videoIds, setVideoIds] = useState([]);

  useEffect(() => {
    const fetchVideoIds = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=id&type=video&q=your+search+query&key=${config.youtubeApiKey}&maxResults=10`
        );
        const data = await response.json();
        const ids = data.items.map((item) => item.id.videoId);
        setVideoIds(ids);
      } catch (error) {
        console.error('Error fetching video IDs:', error);
      }
    };

    fetchVideoIds();
  }, []);

  return (
    <VideoList videoIds={videoIds} />
  )
}
