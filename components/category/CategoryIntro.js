'use client';
import React, { useState } from 'react';

function CategoryIntro({ genreIntro }) {
  const genre = genreIntro.split(' ');

  const [isFullIntro, setIsFullIntro] = useState(true);
  return (
    <div>
      {isFullIntro && genre.length > 30 ? (
        <p>{genre.slice(0, 30).join(' ')}...</p>
      ) : (
        genreIntro
      )}
      <button onClick={() => setIsFullIntro((prevState) => !prevState)}>
        {isFullIntro ? 'read more' : 'read less'}
      </button>
    </div>
  );
}

export default CategoryIntro;
