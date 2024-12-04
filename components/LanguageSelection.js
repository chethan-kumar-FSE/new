'use client';
import { useBackdropContext } from '@/context/backdrop';
import useResource from '@/hooks/useResource';
import { langService } from '@/services/langService';

import React, { useState, useEffect } from 'react';
import Loader from './Loader';

function LanguageSelection({ isFromHome }) {
  const [languages, setLanguages] = useState([]);
  const { toggleBackdropStatus } = useBackdropContext();
  const {
    isLoading,
    error,
    fetchData: getLanguages,
  } = useResource(langService?.getLanguages);

  useEffect(() => {
    (async () => {
      const languages = await getLanguages();
      console.log('langauges');
      setLanguages(languages);
    })();
  }, []);

  const handleOnLanguageSelection = async (displayShort, href) => {
    // Set the language cookie and navigate only after cookie is set

    if (!isFromHome) {
      toggleBackdropStatus({ boolVal: false });
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/set-cookies`, {
      method: 'POST',
      body: JSON.stringify({
        language: displayShort,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const redirectTo = displayShort === 'en' ? '/' : `/${displayShort}`;

    window.location.href = redirectTo; // Use router to push to the href
  };

  if (error) {
    throw new Error('Something went wrong !');
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`w-full ${
        isFromHome ? 'bg-black h-screen' : 'bg-[#1b1b1b]'
      } text-white flex justify-center items-center flex-col p-5`}
    >
      <div className="w-full max-w-[440px]">
        {/* <CommonHeader /> */}
        <p className="text-center py-6">Select languages</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mx-auto relative">
          {languages?.map((lang, index) => {
            const href = `/${lang.display_short}`;
            return (
              <div
                key={index}
                className="text-center border border-[#4a4a4a] p-3 rounded-xl cursor-pointer h-16 overflow-hidden text-white w-full"
                onClick={() =>
                  handleOnLanguageSelection(lang.display_short, href)
                }
              >
                <p>{lang.display}</p>
                <p>{lang.display_lang}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LanguageSelection;
