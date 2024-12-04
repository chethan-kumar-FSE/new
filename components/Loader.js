'use client';
import Image from 'next/image';
import React from 'react';

function Loader() {
  return (
    <Image
      className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent"
      src={'/others/loader.gif'}
      width={60}
      height={60}
      alt="loader"
    />
  );
}

export default Loader;
