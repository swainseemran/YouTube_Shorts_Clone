// import React, { useState, useEffect } from 'react';
// import config from '../services/config.json';

// export const VideoList = ({ videoIds }) => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const promises = videoIds.map(async (videoId) => {
//           const response = await fetch(
//             `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${config.youtubeApiKey}`
//           );
//           const data = await response.json();
//           return data.items[0];
//         });

//         const fetchedVideos = await Promise.all(promises);
//         setVideos(fetchedVideos);
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
//   }, [videoIds]);

//   if (videos.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-wrap">
//       {videos.map((video) => (
//         <div key={video.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
//           <div className="bg-gray-100 rounded-lg overflow-hidden">
//             <iframe
//               width="100%"
//               height="90%"
//               src={`https://www.youtube.com/embed/${video?.id}`}
//               title={video?.snippet.title}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold mb-2">{video.snippet.title}</h3>
//                 {/* You can add more video details here if needed */}
//               </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };





// import React, { useState, useEffect } from 'react';
// import config from '../services/config.json';

// export const VideoList = ({ videoIds }) => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const promises = videoIds.map(async (videoId) => {
//           const response = await fetch(
//             `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${config.youtubeApiKey}`
//           );
//           const data = await response.json();
//           return data.items[0];
//         });

//         const fetchedVideos = await Promise.all(promises);
//         setVideos(fetchedVideos);
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
//   }, [videoIds]);

//   return (
//     <div className="flex flex-wrap">
//       {videos.map((video) => (
//         <div key={video?.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
//           {video && video.snippet && (
//             <div className="bg-gray-100 rounded-lg overflow-hidden">
//               <iframe
//                 key={video?.id}
//                 width="100%"
//                 height="90%"
//                 src={`https://www.youtube.com/embed/${video?.id}`}
//                 title={video?.snippet.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold mb-2">{video?.snippet.title}</h3>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

