import React from 'react';

export const VideoItem = ({ video }) => {
  return (
    <div className="w-full p-4">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="90%"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.snippet.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{video.snippet.title}</h3>
        </div>
      </div>
    </div>
  );
};







// import React from 'react';

// export const VideoItem = ({ videoId, title }) => {
//   return (
//     <div className="w-full p-4">
//       <div className="bg-gray-100 rounded-lg overflow-hidden">
//         <iframe
//           width="100%"
//           height="90%"
//           src={`https://www.youtube.com/embed/${videoId}`}
//           title={title}
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         />
//         <div className="p-4">
//           <h3 className="text-lg font-semibold mb-2">{title}</h3>
//           {/* You can add more video details here if needed */}
//         </div>
//       </div>
//     </div>
//   );
// };