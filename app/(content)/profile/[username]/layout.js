import UserProfileDesc from '@/components/profile/UserProfileDesc';
import ProfileHeader from '@/components/profile/ProfileHeader';
import UserPostsNav from '@/components/profile/UserPostsNav';
import { UserCommonIdProvider } from '@/context/userCommonId';
import { userService } from '@/services/userService';
import PostsLayout from '@/layouts/PostsLayout';
import ProfileDetails from '@/components/profile/ProfileDetails';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '@/components/Fallback';

export const dynamic = 'force-dynamic'; // Force the page to be dynamic

export default async function ProfileLayout({ children, params }) {
  const { username } = params; // Extract dynamic route params

  let profileData = null;
  try {
    profileData = await userService?.getUserProfileData({
      requestBody: { username: username },
    });
  } catch (err) {
    throw new Error('Something went wrong');
  }

  const {
    first_name,
    user_image,
    author_intro,
    total_post,
    total_followers,
    common_user_id,
  } = profileData || {};

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <PostsLayout className="text-[#fff]">
        <div className="flex flex-col gap-[1em] relative">
          <ProfileDetails>
            <ProfileHeader
              firstName={first_name}
              userImage={user_image}
              userName={username}
              totalPosts={total_post}
              totalFollowers={total_followers}
            />
            <UserProfileDesc profileIntro={author_intro} />
            <UserPostsNav userName={username} />
          </ProfileDetails>

          <UserCommonIdProvider initialCommonId={common_user_id}>
            {children}
          </UserCommonIdProvider>
        </div>
      </PostsLayout>
    </ErrorBoundary>
  );
}
