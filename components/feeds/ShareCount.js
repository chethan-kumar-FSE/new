'use client';
import React from 'react';
import Image from 'next/image';

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
      onClick={() =>
        handleOnShare({
          postId: articleId,
          urlString,
          postImage: `https://imagesvs.oneindia.com/webp/trends${shareImageLink}`,
          newsTitle,
        })
      }
      style={{ cursor: 'pointer' }}
    >
      <Image
        src="https://www.hitzfeed.com/trends/media/images/icons/share-icon.svg"
        width={20}
        height={20}
        alt="Share"
      />
      <p style={{ fontSize: '12px', textAlign: 'center', color: '#fff' }}>
        {shareCount}
      </p>
    </div>
  );
}

export default ShareCount;
