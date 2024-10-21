'use client';
import { useEffect, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { redirect, useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    const isLanguagePresentInCookie = Cookies.get('language');
    if (isLanguagePresentInCookie) {
      return redirect('/feeds');
    }
  }, []);

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get(
        'https://oneindia.greynium.com/trends/api/index.php?action=languages'
      );
      setLanguages(data);
    })();
  }, [router]);

  const handleOnLanguageSelection = (displayShort) => {
    //expires in  days
    Cookies.set('language', displayShort, { expires: 7 });
    router.push('/feeds');
  };
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          width: '400px',
          columnGap: '1em',
          rowGap: '0.5em',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        {languages?.map((lang, index) => {
          return (
            <div
              style={{
                textAlign: 'center',
                backgroundImage: 'linear-gradient(to right, #8c78cf, #eb3ead)',
                border: '1px solid #4a4a4a',
                padding: '12px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                height: '65px',
                overflow: 'hidden',
                color: 'white',
              }}
              onClick={() => handleOnLanguageSelection(lang.display_short)}
              key={index}
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
