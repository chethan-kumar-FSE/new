// app/components/NavLink.js
'use client'; // Make this a client component

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({ href, linkName, keyName, isActive }) {
  // Check if the current pathname starts with the href

  return (
    <Link
      href={href}
      className={`text-center font-bold p-1 text-[16px] relative ${
        isActive
          ? 'bg-[#1b1b1b] text-[#8500ff] border-b-4 border-[#8500ff]'
          : 'bg-transparent text-white border-none'
      }`}
    >
      {linkName}
    </Link>
  );
}

export default NavLink;
