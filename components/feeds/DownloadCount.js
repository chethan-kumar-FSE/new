'use client';
import React, { useState } from 'react';
import { feedsServices } from '@/services/feedsService';
import Cookies from 'js-cookie';
import Image from 'next/image';
function DownloadCount({
  articleId,
  shareImageLink,
  downloadCount,
  newsLanguage,
}) {
  const [initialDownloadCount, setInitialDownloadCount] =
    useState(downloadCount);

  const userId = Cookies.get('userId');

  const updateDownloadCount = async () => {
    const previousDownloadCount =
      initialDownloadCount === '' ? 0 : initialDownloadCount;

    setInitialDownloadCount(previousDownloadCount + 1);
    try {
      const response = await feedsServices.postDownload({
        requestBody: {
          articleid: articleId,
          downcount: 1,
          userid: userId || 0,
          lang: newsLanguage,
        },
      });
      console.log('downcount', response);
      const { count } = response;
      setInitialDownloadCount(count);
    } catch (err) {
      setInitialDownloadCount(
        previousDownloadCount === 0 ? '' : previousDownloadCount
      );
    }
  };

  const handleOnImageDownload = async () => {
    const imageUrl = `https://imagesvs.oneindia.com/trends${shareImageLink}`;
    const defaltPath = shareImageLink;
    const outsideRes = await fetch(imageUrl);
    const parts = defaltPath.split('/');
    const downloadImageName = parts[parts.length - 1];
    const blob = await outsideRes.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = downloadImageName;
    link.click();

    updateDownloadCount();
  };
  return (
    <div onClick={handleOnImageDownload} style={{ cursor: 'pointer' }}>
      <Image
        src="https://www.hitzfeed.com/trends/media/images/icons/download-icon.svg"
        width={20}
        height={20}
        alt="Download"
      />
      <p style={{ fontSize: '12px', textAlign: 'center', color: '#fff' }}>
        {initialDownloadCount}
      </p>
    </div>
  );
}

export default DownloadCount;
