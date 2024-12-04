'use client';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

function ProfileDetails({ children }) {
  const params = useParams();

  const keys = Object.keys(params);
  if (keys.length === 2 && keys[1] === 'postid') return null;
  return <div className="flex flex-col gap-[1em]">{children}</div>;
}

export default ProfileDetails;
