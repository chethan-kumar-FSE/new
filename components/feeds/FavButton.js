'use client';
import React, { useState } from 'react';
import { feedsServices } from '@/services/feedsService';
import Cookies from 'js-cookie';
import { notify } from '@/utils/Toast';
import useResource from '@/hooks/useResource';
import { useSessionAndConnectivity } from '@/hooks/useSessionAndConnectivity';
import { PiStar, PiStarFill } from 'react-icons/pi';

function FavButton({ saveCount, articleId, newsLanguage, userSave }) {
  //initizalsing the save count and if user has saved the current post or not
  const [initialSaveCount, setInitialSaveCount] = useState(saveCount);
  const [initialUserSave, setInitialUserSave] = useState(userSave);

  const { checkSessionAndConnectivity } = useSessionAndConnectivity();

  //custom hook for getting update save count
  const { fetchData: getUpdatedSaveCount, error } = useResource(
    feedsServices?.getUpdatedSaveCount
  );

  //router instance on client side

  //extratcing the session from next-auth/react

  //extracting userid from cookies
  const userId = Cookies.get('userId');

  //tracking variable for incase if API fails
  const prevSaveCount = initialSaveCount === '' ? 0 : initialSaveCount;
  const prevUserSave = initialUserSave;

  //handling on save button click
  const handleOnSave = async () => {
    //checking if theres connection to internet and notify the user
    const canProceed = checkSessionAndConnectivity();

    if (!canProceed) return;
    //state updates for optmistic update to give user feedback
    setInitialSaveCount((prevCount) =>
      initialUserSave ? prevCount - 1 : prevCount + 1
    );
    setInitialUserSave(initialUserSave ? 0 : 1);

    //getting the save count of the current post
    const saveCount = await getUpdatedSaveCount({
      requestBody: {
        articleid: articleId,
        savestatus: initialUserSave ? 0 : 1,
        userid: userId,
        lang: newsLanguage,
      },
    });

    //setting the savcount from API response
    setInitialSaveCount(saveCount);
  };

  //if error notify user and get back to previous state
  if (error) {
    notify({ message: 'something went wrong !', isError: true });
    setInitialSaveCount(prevSaveCount === 0 ? '' : prevSaveCount);
    setInitialUserSave(prevUserSave);
  }
  return (
    <div
      onClick={handleOnSave}
      className="flex gap-1 flex-col cursor-pointer justify-center"
    >
      {/* <img
        //
        src={
          initialUserSave
            ? '/feedicons/save-icon-active.svg'
            : '/feedicons/save-icon.svg'
        }
        className="w-[20px] h-[20px]"
        alt="Save"
      /> */}
      {initialUserSave ? (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 256 256"
          class="text-[#fff]"
          height="26"
          width="26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
        </svg>
      ) : (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 256 256"
          height="26"
          width="26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path>
        </svg>
      )}
      <p className={`${initialSaveCount === '' ? 'text-transparent' : ''}`}>
        {initialSaveCount === '' ? 0 : initialSaveCount}
      </p>{' '}
    </div>
  );
}

export default FavButton;
