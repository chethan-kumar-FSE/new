'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosArrowDropleft } from 'react-icons/io';

function CommentHeader() {
  const router = useRouter();
  return (
    <div className="p-[1em] flex gap-[1.3em] h-[50px] bg-black fixed top-[0px]">
      <div className="cursor-pointer" onClick={() => router.back()}>
        <IoIosArrowDropleft className="text-[#fff]" size={28} />
      </div>

      <p className="text-[18px] text-[#fff] font-bold">Comments</p>
    </div>
  );
}

export default CommentHeader;
