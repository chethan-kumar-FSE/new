'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { CiGrid42 } from 'react-icons/ci';
import { MdVideoLibrary } from 'react-icons/md';
import { GoStarFill } from 'react-icons/go';

function UserPostsNav({ userName }) {
  //const router = useRouter();
  const pathname = usePathname();
  console.log('currentpath', pathname);

  const items = [
    {
      src: <CiGrid42 size={30} />,
      navigateTo: `/profile/${userName}`,
    },
    {
      src: <MdVideoLibrary size={28} />,
      navigateTo: `/profile/${userName}/videos`,
    },
    {
      src: <GoStarFill size={28} />,
      navigateTo: `/profile/${userName}/saved`,
    },
  ];

  return (
    <nav className="grid grid-cols-3 gap-4">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.navigateTo}
          className={` font-bold text-center flex justify-center items-center  rounded-md transition-colors duration-200 ${
            pathname === item.navigateTo ? ' text-[#fff]' : ' text-zinc-400	'
          }`}
        >
          <span>{item.src}</span>
        </Link>
      ))}
    </nav>
  );
}

export default UserPostsNav;
