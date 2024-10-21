import { ReplyProvider } from '@/context/replyingUser';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function CommentLayout({ children }) {
  const session = await getServerSession();

  if (!session && !session?.user) {
    return redirect('/');
  }
  return <ReplyProvider>{children}</ReplyProvider>;
}
