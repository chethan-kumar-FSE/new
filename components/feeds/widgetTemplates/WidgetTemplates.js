'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { genreService } from '@/services/genreService';
import Template1 from './template-1/Template1';
import Template2 from './template-2/Template2';
import Template3 from './template-3/Template3';
import Template4 from './template-4/Template4';
import Template5 from './template-5/Template5';
import { v4 as uuidv4 } from 'uuid';

import { shuffleArray } from '@/utils/shuffleArray';

function WidgetTemplates({ lang }) {
  const [templateToRender, setTemplateToRender] = useState('');

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
        requestBody: { lang: lang || 'en' },
      });

      const shuffledArray = shuffleArray(genreListResponse);

      // Retrieve the last used template index from localStorage or default to 0
      let templateIndex =
        parseInt(localStorage.getItem('templateIndex'), 10) || 0;

      // Ensure templateIndex is within the bounds of the templates array
      templateIndex = templateIndex % templates.length;

      // Render the template based on the index
      const component = React.cloneElement(templates[templateIndex], {
        genreList: shuffledArray,
        lang: lang,
      });

      setTemplateToRender(component);

      // Increment the index and reset to 0 if it exceeds the template array length
      localStorage.setItem(
        'templateIndex',
        (templateIndex + 1) % templates.length
      );
    })();
  }, [lang]); // Depend on `isOnPage` to update when the component conditionally renders

  return <Suspense fallback={<p>loading...</p>}>{templateToRender}</Suspense>;
}

export default WidgetTemplates;
