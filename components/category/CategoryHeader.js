import { genreService } from '@/services/genreService';
import React from 'react';
import CommonHeader from '../CommonHeader';

async function CategoryHeader({ genreName }) {
  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5em',
        marginBottom: '0.5em',
      }}
    >
      <CommonHeader />
      <div style={{ background: '#1b1b1b' }}>
        <p
          style={{
            display: 'block',
            textAlign: 'center',
            color: '#8500ff',
            fontWeight: 'bold',
            padding: '10px',
            fontSize: '16px',
            background: '#1b1b1b',
            position: 'relative',
          }}
        >
          {genreName}
        </p>
      </div>
    </div>
  );
}

export default CategoryHeader;
