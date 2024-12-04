'use client';
import React from 'react';
import { PiShareFat } from 'react-icons/pi';
import { PiShareNetwork } from 'react-icons/pi';

function ShareCount({
  handleOnShare,
  shareCount,
  articleId,
  urlString,
  shareImageLink,
  newsTitle,
}) {
  return (
    <div
      onClick={() => {
        //on click of share, send below properits to share component to handle media sharing
        //handleOnShare is present in feeds component
        handleOnShare({
          postId: articleId,
          urlString,
          postImage: `https://imagesvs.oneindia.com/webp/trends${shareImageLink}`,
          newsTitle,
        });
      }}
      className="flex gap-1 flex-col cursor-pointer justify-center"
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 256 256"
        height="28"
        width="28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z"></path>
      </svg>{' '}
      <p className={`${shareCount === '' ? 'text-transparent' : ''}`}>
        {shareCount === '' ? 0 : shareCount}
      </p>{' '}
    </div>
  );
}

export default ShareCount;
