'use client';
import React from 'react';

function NoCommentsMessage() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center">
      <img
        src="https://www.hitzfeed.com/trends/media/flashcard/no-comments.svg"
        alt="smething"
        className="w-[90px] h-[90px]"
      />
      <p className="text-[#d2d5d9] text-[20px] text-center p-[5px] font-bold">
        Be the first to comment
      </p>
    </div>
  );
}

export default NoCommentsMessage;
