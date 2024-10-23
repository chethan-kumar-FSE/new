'use client';
import { useBackdropContext } from '@/context/backdrop';
import useResource from '@/hooks/useResource';
import { langService } from '@/services/langService';
import Cookies from 'js-cookie';
import { fetchData } from 'next-auth/client/_utils';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation

import React, { useState, useEffect } from 'react';
import CommonHeader from './CommonHeader';

function LanguageSelection({ isFromHome }) {
  const [languages, setLanguages] = useState([]);
  const router = useRouter(); // Router for manual navigation
  //const { toggleBackdropStatus } = useBackdropContext();
  const {
    isLoading,
    error,
    fetchData: fetchLanguages,
  } = useResource(langService.getLanguages);
  useEffect(() => {
    (async () => {
      const response = await fetchLanguages();
      setLanguages(response);
    })();
  }, []);

  const handleOnLanguageSelection = (displayShort, href) => {
    // Set the language cookie and navigate only after cookie is set

    Cookies.set('language', displayShort, { expires: 7 });

    //stoggleBackdropStatus();
    router.push(href); // Use router to push to the href
  };

  if (isLoading) {
    return (
      <p
        style={{
          color: '#fff',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        Loading....
      </p>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px', // You can set the maxWidth here
        margin: '0 auto', // Center the container
        background: isFromHome ? '#00000' : '#1b1b1b',
        color: '#fff',
        height: isFromHome ? '100vh' : 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px', // Optional padding for breathing space
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <CommonHeader />
        <p style={{ textAlign: 'center', padding: '24px 0px' }}>
          Select languages
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // 50% width for two columns
            columnGap: '1em',
            rowGap: '0.5em',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {languages?.map((lang, index) => {
            const href = `/${lang.display_short}`;
            return (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  border: '1px solid #4a4a4a',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  height: '65px',
                  overflow: 'hidden',
                  color: 'white',
                  width: '100%',
                }}
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
