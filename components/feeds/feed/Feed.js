import { useBackdropContext } from '@/context/backdrop';
import FollowButton from '@/components/Follow';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DownloadCount from '../DownloadCount';
import ViewCount from '../ViewCount';
import LikeButton from '../LikeButton';
import CommentButton from '../CommentButton';
import FavButton from '../FavButton';
import ShareCount from '../ShareCount';
import Head from 'next/head';

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
  },
  ref
) => {
  const fontSize = '12px';
  console.log('rendering');

  return (
    <div
      style={{
        color: 'white',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
      ref={ref} // Use the ref here
    >
      {/* User Info and Follow Button */}
      <div
        style={{
          display: 'flex',
          gap: '1em',
          alignItems: 'center',
        }}
      >
        <Image
          src={userImage}
          width={40}
          height={40}
          style={{ borderRadius: '50%' }}
          alt={userImage}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <Link
          style={{ color: '#fff', textDecoration: 'none' }}
          href={`/profile/${secureUserId}`}
          scroll={false}
        >
          {userName}
        </Link>
        {/* <FollowButton /> */}
        <button
          style={{
            padding: '1px 12px',
            background: '#fff',
            borderRadius: '10px',
            textAlign: 'center',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          follow
        </button>
        <span
          style={{
            width: '200px',
            height: '1px',
            backgroundColor: 'white',
          }}
        ></span>
      </div>

      {/* News Title */}
      <div style={{ fontSize: '12px' }}>
        <p>{newsTitle}</p>
      </div>

      {/* Image Display */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'auto',
        }}
      >
        <Image
          src={`https://imagesvs.oneindia.com/webp/trends${imageLink}`}
          alt={imageLink}
          style={{
          /*   width: '100%',
            height: '100%', */
            objectFit: 'contain',
          }}
          width="440"
          height="200"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>

      {/* Interaction Icons: Like, Save, Share */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1em',
        }}
      >
        <div>
          <div style={{ display: 'flex', gap: '1em' }}>
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
        </div>
        <div>
          <div style={{ display: 'flex', gap: '1em' }}>
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
        </div>
      </div>
    </div>
  );
};

// Attach forwardRef below the component definition
const ForwardedFeed = forwardRef(Feed);

// Export the memoized version
export default React.memo(ForwardedFeed);
