'use client';
import Image from 'next/image';
import React from 'react';

function NoCommentsMessage() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        alignItems: 'center',
      }}
    >
      <Image
        src="https://www.hitzfeed.com/trends/media/flashcard/no-comments.svg"
        alt="smething"
        style={{ width: '90px', height: '90px' }}
      />
      <p
        style={{
          color: '#d2d5d9',
          fontSize: '20px',
          textAlign: 'center',
          padding: '5px',
          fontWeight: 'bold',
        }}
      >
        Be the first to comment
      </p>
    </div>
  );
}

export default NoCommentsMessage;
