import React, { useState, useEffect, useRef } from "react";
import config from '../services/config.json'

export const Video = () => {
  const [videos, setVideos] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [likedVideos, setLikedVideos] = useState([]);
  const videoRefs = useRef({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=youtube shorts&key=${config.youtubeApiKey}&maxResults=20`
        );
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = 300;
    if (direction === 'left' || direction === 'up') {
      setScrollPosition((prevPos) => Math.max(prevPos - scrollAmount, 0));
    } else if (direction === 'right' || direction === 'down') {
      setScrollPosition((prevPos) => Math.min(prevPos + scrollAmount, videos.length * 100)); // Adjust 100 based on the video height
    }
  };

  const toggleLike = (videoId) => {
    if (likedVideos.includes(videoId)) {
      setLikedVideos(likedVideos.filter(id => id !== videoId));
    } else {
      setLikedVideos([...likedVideos, videoId]);
    }
  };

  const handleVideoRef = (videoId) => (element) => {
    if (element) {
      videoRefs.current[videoId] = element;
    }
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const videoId = entry.target.getAttribute('data-video-id');
        if (entry.isIntersecting) {
          if (videoRefs.current[videoId]) {
            videoRefs.current[videoId].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          }
        } else {
          if (videoRefs.current[videoId]) {
            videoRefs.current[videoId].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          }
        }
      });
    }, { threshold: 0.5 });

    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        intersectionObserver.observe(video);
      }
    });

    return () => {
      intersectionObserver.disconnect();
    };
  }, [videos]);

  if (videos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex flex-wrap"
        style={{ transform: `translateX(-${scrollPosition}%)` }}
      >
        {videos.map((video) => (
          <div key={video.id.videoId} className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${video.id.videoId}?enablejsapi=1`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ref={handleVideoRef(video.id.videoId)}
                data-video-id={video.id.videoId}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {video.snippet.title}
                </h3>
                <button
                  className={`bg-gray-200 rounded-full p-2 ${
                    likedVideos.includes(video.id.videoId)
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                  onClick={() => toggleLike(video.id.videoId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {likedVideos.includes(video.id.videoId) ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          className="bg-gray-200 rounded-full p-2"
          onClick={() => handleScroll("left")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          className="bg-gray-200 rounded-full p-2"
          onClick={() => handleScroll("right")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};


// import React from 'react';
// import { VideoList } from './VideoList';

// export const Video = ({ videoIds }) => {
//   return (
//     <div className="overflow-hidden relative">
//       <VideoList videoIds={videoIds} />
//     </div>
//   );
// };
