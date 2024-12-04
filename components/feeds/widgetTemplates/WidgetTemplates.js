'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { genreService } from '@/services/genreService';
import { Template1, Template2, Template3, Template4 } from './index';
import { v4 as uuidv4 } from 'uuid';

import { shuffleArray } from '@/utils/shuffleArray';
import Cookies from 'js-cookie';

function WidgetTemplates() {
  const [templateToRender, setTemplateToRender] = useState('');
  const language = Cookies.get('language');
  useEffect(() => {
    (async () => {
      const templates = [
        <Template1 key={uuidv4()} />,
        <Template2 key={uuidv4()} />,
        <Template3 key={uuidv4()} />,
        <Template4 key={uuidv4()} />,
        // <Template5 />,
      ];

      const genreListResponse = await genreService.getGenre({
        requestBody: { lang: language || 'en' },
      });

      //handle when genre list comes as undefined due to offline
      if (!genreListResponse) {
        setTemplateToRender(null);
        return;
      }
      const shuffledArray = shuffleArray(genreListResponse);

      // Retrieve the last used template index from localStorage or default to 0
      let templateIndex =
        parseInt(localStorage.getItem('templateIndex'), 10) || 0;

      // Ensure templateIndex is within the bounds of the templates array
      templateIndex = templateIndex % templates.length;

      // Render the template based on the index
      const component = React.cloneElement(templates[templateIndex], {
        genreList: shuffledArray,
        lang: language,
      });

      setTemplateToRender(component);

      // Increment the index and reset to 0 if it exceeds the template array length
      localStorage.setItem(
        'templateIndex',
        (templateIndex + 1) % templates.length
      );
    })();
  }, [language]); // Depend on `isOnPage` to update when the component conditionally renders

  return <div className="w-[100%]">{templateToRender}</div>;
}

export default WidgetTemplates;
