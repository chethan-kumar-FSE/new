import { BottomBar } from '@/components/BottomBar';
import './../globals.css';

export default function ContentLayout({ children }) {
  return (
    <>
      {children}
      <BottomBar />
    </>
  );
}
