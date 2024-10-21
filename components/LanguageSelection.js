'use client';
import { useBackdropContext } from '@/context/backdrop';
import { langService } from '@/services/langService';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation

import React, { useState, useEffect } from 'react';

function LanguageSelection() {
  const [languages, setLanguages] = useState([]);
  const router = useRouter(); // Router for manual navigation
  const { toggleBackdropStatus } = useBackdropContext();
  useEffect(() => {
    (async () => {
      const langs = await langService.getLanguages();
      setLanguages(langs);
    })();
  }, []);

  const handleOnLanguageSelection = (displayShort, href) => {
    // Set the language cookie and navigate only after cookie is set

    Cookies.set('language', displayShort, { expires: 7 });

    toggleBackdropStatus();
    router.push(href); // Use router to push to the href
  };

  return (
    <div
      style={{
        width: '100%',
        background: '#1b1b1b',
        color: '#fff',
      }}
    >
      <p style={{ textAlign: 'center', padding: '24px 0px' }}>
        Select languages
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          columnGap: '1em',
          rowGap: '0.5em',
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
              }}
              onClick={() =>
                handleOnLanguageSelection(lang.display_short, href)
              }
              // href={href}
            >
              <p>{lang.display}</p>
              <p>{lang.display_lang}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageSelection;
