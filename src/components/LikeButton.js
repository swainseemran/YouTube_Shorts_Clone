import React, { useState } from 'react';

export const LikeButton = ({ videoId }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
    setTimeout(() => {
      console.log(`Like status for video ${videoId} updated to: ${!liked}`);
    }, 500);
  };

  return (
    <button
      className={`bg-gray-200 rounded-full p-2 ${
        liked ? 'text-red-500' : 'text-gray-600'
      }`}
      onClick={toggleLike}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {liked ? (
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
  );
};
