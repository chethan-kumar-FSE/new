import './../../globals.css';

import FeedsHeader from '@/components/feeds/feedsheader/FeedsHeader';

export default function FeedsLayout({ children }) {
  return (
    <>
      <FeedsHeader />
      {children}
    </>
  );
}
