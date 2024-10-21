// app/components/NavLink.js
'use client'; // Make this a client component

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({ href, linkName }) {
  const pathname = usePathname(); // Get the current pathname

  // Check if the current pathname starts with the href
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '10px',
        fontSize: '16px',
        position: 'relative',
        background: isActive ? '#1b1b1b' : 'transparent',
        color: isActive ? '#8500ff' : '#fff',
        borderBottom: isActive ? '5px solid #8500ff' : 'none',
        textDecoration: 'none',
      }}
    >
      {linkName}
    </Link>
  );
}

export default NavLink;
