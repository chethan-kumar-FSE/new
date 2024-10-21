'use client';
import React, { useState } from 'react';

function ProfileDesc({ profileIntro }) {
  console.log('profileIntro', profileIntro);
  const desc = profileIntro;
  const descSplit = desc?.split(' ');
  const [isReadMore, setIsReadMore] = useState(false);
  return (
    <div>
      <p>
        {isReadMore ? descSplit.join(' ') : descSplit.slice(0, 40).join(' ')}
      </p>
      <button onClick={() => setIsReadMore((prevState) => !prevState)}>
        {isReadMore ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
}

export default ProfileDesc;
