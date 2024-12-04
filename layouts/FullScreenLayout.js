import React from 'react';

function FullScreenLayout({ children }) {
  return (
    <main className="w-[100%]">
      <section>{children}</section>
    </main>
  );
}

export default FullScreenLayout;
