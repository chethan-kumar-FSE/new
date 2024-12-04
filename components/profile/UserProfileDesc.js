'use client';
import React, { useState } from 'react';

function ProfileDesc({ profileIntro }) {
  console.log('profileIntro', profileIntro);
  const desc = profileIntro;
  const descSplit = desc?.split(' ');
  const [isReadMore, setIsReadMore] = useState(false);
  return (
    <div className="text-[12px] lg:text-[14px]">
      <p>
        {isReadMore ? descSplit.join(' ') : descSplit.slice(0, 30).join(' ')}
      </p>
      <button
        className="underline"
        onClick={() => setIsReadMore((prevState) => !prevState)}
      >
        {isReadMore ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
}

export default React.memo(ProfileDesc);
