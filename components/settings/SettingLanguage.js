'use client';
import React from 'react';
import Backdrop from '@/share/backdrop';
import LanguageSelection from '../LanguageSelection';
function SettingLanguage() {
  return (
    <Backdrop>
      <div
        className="bg-[#1b1b1b] w-full p-4 absolute bottom-0"
        onClick={(e) => e.stopPropagation()}
      >
        <LanguageSelection />
      </div>
    </Backdrop>
  );
}

export default SettingLanguage;
