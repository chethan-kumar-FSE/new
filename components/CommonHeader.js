'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosArrowDropleft } from 'react-icons/io';
import { CiSettings } from 'react-icons/ci';

function CommonHeader({ shouldDisplay, userName, usernameFromCookie }) {
  const router = useRouter();
  return (
    <div className="flex justify-center top-0 bg-[#000] items-center p-4  sticky z-10">
      <Link href={'/'}>
        <img src="/others/logo.svg" width={100} height={27} alt="something" />
      </Link>
      {shouldDisplay && (
        <span
          className="absolute left-0 cursor-pointer z-11"
          onClick={() => router.back()}
        >
          <IoIosArrowDropleft size={28} className="text-[#fff]" />
        </span>
      )}
      {userName && usernameFromCookie && userName === usernameFromCookie && (
        <Link className="absolute top-4 right-0 block" href={'/setting'}>
          <CiSettings className="text-[#fff]" size={28} />
        </Link>
      )}
    </div>
  );
}

export default CommonHeader;
