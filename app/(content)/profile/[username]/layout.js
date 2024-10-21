import ProfileDesc from '@/components/profile/ProfileDesc';
import ProfileHeader from '@/components/profile/ProfileHeader';
import UserPostsNav from '@/components/profile/UserPostsNav';
import { UserCommonIdProvider } from '@/context/userCommonId';
import { userService } from '@/services/userService';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic'; // Force the page to be dynamic

export default async function ProfileLayout({ children, params }) {
  const { username } = params; // Extract dynamic route params
  const data = await userService.getUserProfileData({
    requestBody: { username: username },
  });
  console.log('prining');
  const {
    first_name,
    user_image,
    author_intro,
    total_post,
    total_followers,
    common_user_id,
  } = data || {};

  const header = (
    <>
      <ProfileHeader
        firstName={first_name}
        userImage={user_image}
        userName={username}
        totalPosts={total_post}
        totalFollowers={total_followers}
      />
      <ProfileDesc profileIntro={author_intro} />
      <UserPostsNav userName={username} />
    </>
  );
  return (
    <div style={{ width: '100%', color: 'white', paddingBottom: '5em' }}>
      <div
        style={{
          maxWidth: '440px',
          margin: '1em auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        {header}

        <UserCommonIdProvider initialCommonId={common_user_id}>
          {children}
        </UserCommonIdProvider>
      </div>
    </div>
  );
}
