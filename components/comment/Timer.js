import React from 'react';
import { timeAgo } from '@/utils/timestamp';
const Timer = ({ timestamp }) => {
  return (
    <p style={{ color: '#d2d5d9', fontSize: '12px' }}>{timeAgo(timestamp)}</p>
  );
};

export default React.memo(Timer);
