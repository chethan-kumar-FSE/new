import React from 'react';

function PostsLayout({ children, className }) {
  return (
    <main className="w-[100%]">
      <section className={`max-w-[440px] mx-auto px-4  relative ${className}`}>
        {children}
      </section>
    </main>
  );
}

export default PostsLayout;
