'use client';
import React, { useEffect, useState } from 'react';
import { feedsServices } from '@/services/feedsService';
import Cookies from 'js-cookie';
import useResource from '@/hooks/useResource';
import { PiEyeLight } from 'react-icons/pi';

function ViewCount({ viewCount, currentId, newsLanguage }) {
  //state initialise with veiw count
  const [initialViewCount, setInitialViewCount] = useState(viewCount);

  const { fetchData: getUpdatedViewCount, error } = useResource(
    feedsServices.getUpdatedViewCount
  );

  //extracting userId from cookies
  const userId = Cookies.get('userId');

  useEffect(() => {
    //calling on whenever the post comes into viewport to call view API
    const handlePostIDUpdate = async (event) => {
      //if not online then return from here
      if (!navigator.onLine) return;

      //extract the PostID from event.details object
      const { postID } = event.detail;

      // Check if the postID from the event matches the currentId
      if (postID !== currentId) return;

      const viewCount = await getUpdatedViewCount({
        requestBody: {
          articleid: postID,
          viewcount: 1,
          userid: userId || 0,
          lang: newsLanguage,
        },
      });

      setInitialViewCount(viewCount);
    };

    // Listen for the custom event
    window.addEventListener(`postIDUpdated-${currentId}`, handlePostIDUpdate);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener(
        `postIDUpdated-${currentId}`,
        handlePostIDUpdate
      );
    };
  }, []);

  //if error updating view count , printing it
  if (error) {
    console.log('view count API failed ');
  }

  return (
    <div className="flex gap-1 flex-col cursor-pointer justify-center">
      {/* <img
        src="/feedicons/view-icon.svg"
        className="w-[20px] h-[20px]"
        alt="View"
      /> */}
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 256 256"
        height="26"
        width="26"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M245.48,125.57c-.34-.78-8.66-19.23-27.24-37.81C201,70.54,171.38,50,128,50S55,70.54,37.76,87.76c-18.58,18.58-26.9,37-27.24,37.81a6,6,0,0,0,0,4.88c.34.77,8.66,19.22,27.24,37.8C55,185.47,84.62,206,128,206s73-20.53,90.24-37.75c18.58-18.58,26.9-37,27.24-37.8A6,6,0,0,0,245.48,125.57ZM128,194c-31.38,0-58.78-11.42-81.45-33.93A134.77,134.77,0,0,1,22.69,128,134.56,134.56,0,0,1,46.55,95.94C69.22,73.42,96.62,62,128,62s58.78,11.42,81.45,33.94A134.56,134.56,0,0,1,233.31,128C226.94,140.21,195,194,128,194Zm0-112a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162Z"></path>
      </svg>{' '}
      <p className={`${initialViewCount === '' ? 'text-transparent' : ''}`}>
        {initialViewCount === '' ? 0 : initialViewCount}
      </p>{' '}
    </div>
  );
}

export default React.memo(ViewCount);
