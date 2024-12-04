import React from 'react';
import { timeAgo } from '@/utils/timestamp';
const Timer = ({ timestamp }) => {
  return <p className="text-[#d2d5d9] text-[12px]">{timeAgo(timestamp)}</p>;
};

export default React.memo(Timer);
