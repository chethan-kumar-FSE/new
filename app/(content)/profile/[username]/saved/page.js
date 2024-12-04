import UserSavedPosts from '@/components/profile/UserSavedPosts';
function Page({ params }) {
  const { username } = params;
  return (
    <>
      <UserSavedPosts username={username} />
    </>
  );
}
export default Page;
