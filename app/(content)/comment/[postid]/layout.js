import { Fallback } from '@/components/Fallback';
import { ReplyProvider } from '@/context/replyingUser';
import FullScreenLayout from '@/layouts/FullScreenLayout';
import { ErrorBoundary } from 'react-error-boundary';
export default async function CommentLayout({ children }) {
  return (
    <ReplyProvider>
      <ErrorBoundary FallbackComponent={Fallback}>
        <FullScreenLayout>{children}</FullScreenLayout>
      </ErrorBoundary>
    </ReplyProvider>
  );
}
