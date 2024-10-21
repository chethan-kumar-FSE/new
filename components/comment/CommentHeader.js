'use client';
import React from 'react';

function CommentHeader() {
  return (
    <div
      style={{
        padding: '1em',
        display: 'flex',
        gap: '1.3em',
        height: '50px',
        width: '100%',
        background: 'black',
        position: 'fixed',
        top: '0px',
      }}
    >
      <div>
        <i
          style={{
            border: 'solid #fff',
            borderWidth: '0 3px 3px 0',
            padding: '6px',
            transform: 'rotate(135deg)',
            WebkitTransform: 'rotate(135deg)',
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
        ></i>
      </div>

      <p style={{ fontSize: '18px', color: '#fff', fontWeight: 'bolder' }}>
        Comments
      </p>
    </div>
  );
}

export default CommentHeader;
