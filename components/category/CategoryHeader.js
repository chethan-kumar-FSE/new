import React from 'react';
import CommonHeader from '../CommonHeader';

function CategoryHeader({ genreName }) {
  return (
    <>
      <CommonHeader shouldDisplay />
      <div className="text-center flex flex-col gap-[0.5em] ">
        {/* shouldDisplay flag check is for setting icon to show or not */}
        <div className="bg-[#1b1b1b]">
          <p className="block text-center text-[#8500ff] p-[10px] bg-[#1b1b1b] relative font-bold">
            {genreName}
          </p>
        </div>
      </div>
    </>
  );
}

export default CategoryHeader;
