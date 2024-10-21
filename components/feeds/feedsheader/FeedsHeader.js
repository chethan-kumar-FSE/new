import CommonHeader from '@/components/CommonHeader';
import NavLink from '@/components/NavLink';
import React from 'react';

function FeedsHeader() {
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          maxWidth: '440px',
          textAlign: 'center',
          display: 'flex',
          gap: '1em',
          flexDirection: 'column',
        }}
      >
        <CommonHeader />

        <nav
          style={{
            display: 'grid',
            gridTemplateColumns: '50% 50%',
          }}
        >
          <NavLink href={'/en'} linkName={'Feeds'} />
          <NavLink href={'/en/trending'} linkName={'Trending'} />
        </nav>
      </div>
    </div>
  );
}

export default FeedsHeader;
