import React, { forwardRef } from 'react';
import Link from 'next/link';
import DownloadCount from '../DownloadCount';
import ViewCount from '../ViewCount';
import LikeButton from '../LikeButton';
import CommentButton from '../CommentButton';
import FavButton from '../FavButton';
import ShareCount from '../ShareCount';
import FollowButton from '../FollowButton';
import FallbackImage from '@/components/FallbackImage';

const Feed = (
  {
    id,
    imageLink,
    userImage,
    userName,
    shareImageLink,
    newsTitle,
    handleOnShare,
    secureUserId,
    viewCount,
    likeCount,
    commentCount,
    shareCount,
    downloadCount,
    saveCount,
    newsLanguage,
    urlString,
    postIdRef,
    userLike,
    userShare,
    userSave,
    index,
    userFollow,
    channelId,
    updateFollowStatusOnProfileFollow,
    channelName,
  },
  ref
) => {
  return (
    <div
      className="text-[#fff] w-[100%]  relative flex flex-col gap-[1em]"
      ref={ref} // Use the ref here
    >
      {/* User Info and Follow Button */}
      <div className="grid grid-cols-[40px_1fr_120px_1fr] items-center gap-x-4">
        {/* Profile Image */}
        <FallbackImage
          sr={userImage}
          className="rounded-full w-[40px] h-[40px]"
          alt={userImage}
          loading={index === 0 ? 'eager' : 'lazy'}
          userFallback={true}
        />

        {/* Username */}
        <Link
          href={`/profile/${secureUserId}`}
          scroll={false}
          className="text-[#fff] text-[12px] no-underline"
        >
          {userName}
        </Link>

        {/* Follow Button */}
        <FollowButton
          userFollow={userFollow}
          newsLanguage={newsLanguage}
          articleId={id}
          channelId={channelId}
          updateFollowStatusOnProfileFollow={updateFollowStatusOnProfileFollow}
          channelName={channelName}
        />

        {/* Line */}
        <span className="w-full h-[1px] bg-[#fff]"></span>
      </div>
      {/* News Title */}
      <div className="text-[12px] lg:text-[14px]">
        <p>{newsTitle}</p>
      </div>

      {/* Image Display */}
      <div className="relative w-[100%] h-[auto]">
        <FallbackImage
          sr={`https://imagesvs.oneindia.com/webp/trends${imageLink}`}
          alt=""
          className={'w-[100%] h-[100%] rounded-[0.5em]'}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>

      {/* Interaction Icons: Like, Save, Share */}
      <div className="flex justify-between my-[1em] text-[12px] text-center">
        <>
          <div className="flex gap-[1em]">
            <ViewCount
              viewCount={viewCount}
              newsLanguage={newsLanguage}
              currentId={id}
            />
            <LikeButton
              userLike={userLike}
              likeCount={likeCount}
              articleId={id}
              newsLanguage={newsLanguage}
            />
            <CommentButton commentCount={commentCount} articleId={id} />
          </div>
        </>
        <>
          <div className="flex gap-[1em]">
            <FavButton
              saveCount={saveCount}
              articleId={id}
              newsLanguage={newsLanguage}
              userSave={userSave}
            />
            <DownloadCount
              articleId={id}
              shareImageLink={shareImageLink}
              downloadCount={downloadCount}
              newsLanguage={newsLanguage}
            />
            {/* share count */}
            <ShareCount
              handleOnShare={handleOnShare}
              shareCount={shareCount}
              articleId={id}
              urlString={urlString}
              shareImageLink={shareImageLink}
              newsTitle={newsTitle}
            />
          </div>
        </>
      </div>
    </div>
  );
};

// Attach forwardRef below the component definition
const ForwardedFeed = forwardRef(Feed);

// Export the memoized version
export default React.memo(ForwardedFeed);
