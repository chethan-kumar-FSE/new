import React from 'react';
import { cookies } from 'next/headers';
function ChannelHeader() {
  //cookies instance on server side
  const cookieStore = cookies();

  //extract the firstname from cookies
  const firstName = cookieStore.get('firstName')?.value;
  return (
    <div className="bg-black text-white  flex flex-col mb-3">
      <div class="flex gap-2">
        <span class="text-xl font-bold">{firstName}</span>
      </div>

      <div class="flex flex-col items-center p-2.5 px-5 bg-[#222] text-[#9400D3] font-bold text-base">
        Followers
        <div class="w-1/2 h-0.5 bg-[#9400D3] mt-1"></div>
      </div>
    </div>
  );
}

export default ChannelHeader;
