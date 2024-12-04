'use client';
import React, { useState } from 'react';

function CategoryIntro({ genreIntro }) {
  //splitting the genreinto by space
  const genre = genreIntro?.split(' ');

  //setting initial open status value to true boolean value
  const [isFullIntro, setIsFullIntro] = useState(true);
  return (
    <div className="text-justify text-[12px] lg:text-[14px]">
      {/* if greater than 30 the splice it upto 30 and adding ... */}
      {isFullIntro && genre.length > 30 ? (
        <p>{genre.slice(0, 30).join(' ')}...</p>
      ) : (
        //else showing full intro
        genreIntro
      )}
      <button
        className="underline"
        onClick={() => setIsFullIntro((prevState) => !prevState)}
      >
        {/* based on status showing read more or read less text */}
        {isFullIntro ? 'read more' : 'read less'}
      </button>
    </div>
  );
}

export default CategoryIntro;
