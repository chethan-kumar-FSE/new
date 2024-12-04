'use client';
import React, { useState } from 'react';
import { feedsServices } from '@/services/feedsService';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { checkConnectionAndNotify } from '@/utils/network';
import { notify } from '@/utils/Toast';
import useResource from '@/hooks/useResource';
import { PiDownloadSimple } from 'react-icons/pi';

function DownloadCount({
  articleId,
  shareImageLink,
  downloadCount,
  newsLanguage,
}) {
  const [initialDownloadCount, setInitialDownloadCount] =
    useState(downloadCount);
  const { fetchData: postDownload, error } = useResource(
    feedsServices?.postDownload
  );
  const userId = Cookies.get('userId');
  const previousDownloadCount =
    initialDownloadCount === '' ? 0 : initialDownloadCount;

  const updateDownloadCount = async () => {
    //updating states for optmistc updates for user feedback
    setInitialDownloadCount(previousDownloadCount + 1);
    const downloadCount = await postDownload({
      requestBody: {
        articleid: articleId,
        downcount: 1,
        userid: userId || 0,
        lang: newsLanguage,
      },
    });

    //setting the download count frm API response
    setInitialDownloadCount(downloadCount);
  };

  if (error) {
    notify({ message: 'something went wrong !', isError: true });
    setInitialDownloadCount(
      previousDownloadCount === 0 ? '' : previousDownloadCount
    );
  }

  const handleOnImageDownload = async () => {
    //checking for connection and notify user if not present
    if (!checkConnectionAndNotify(notify)) return;

    //creating a blob for downloading post image
    try {
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

      //calling once the download is completed
      updateDownloadCount();
    } catch (err) {
      console.log('something went wrong while downloading');
    }
  };
  //initialsing the download count
  /* 

  
  //extracting the userid from cookies

  //tracking the values incase if API fails
  

  //handling on download button click
  

  //checking if error , notify the user and set back to inital values if API fails
  
 */
  //handling on image download button click
  /*  */
  return (
    <div
      onClick={() => handleOnImageDownload()}
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
        <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z"></path>
      </svg>{' '}
      <p className={`${initialDownloadCount === '' ? 'text-transparent' : ''}`}>
        {initialDownloadCount === '' ? 0 : initialDownloadCount}
      </p>{' '}
    </div>
  );
}

export default DownloadCount;
