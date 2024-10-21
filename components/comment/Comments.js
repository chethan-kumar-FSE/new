'use client';
import React from 'react';
import Comment from './Comment';
import { v4 as uuidv4 } from 'uuid';

function Comments({
  comment,
  newsLanguage,
  articleId,
  userLikedCommentIds,
  containerRef,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        maxHeight: '400px', // Specify a maxHeight or height here
        overflowY: 'auto',
        scrollbarWidth: 'none', // For Firefox
        msOverflowStyle: 'none', // For Internet Explorer and Edge

        margin: '80px 0px 140px 0px',
        padding: '0em 1em',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
      ref={containerRef}
    >
      {comment.map(
        ({
          comment_id,
          lang,
          comment_name,
          likecount,
          comment_timestamp,
          userdetails: { userid, userimage, username },
          replies,
        }) => {
          return (
            <div
              key={uuidv4()}
              style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
            >
              <Comment
                timestamp={comment_timestamp}
                userName={username}
                comment={comment_name}
                userProfileImage={userimage}
                likecount={likecount}
                userId={userid}
                lang={lang}
                commentId={comment_id}
                isLikedByCurrentUser={userLikedCommentIds?.includes(comment_id)}
                articleId={articleId}
                newsLanguage={newsLanguage}
              />

              {replies && (
                <div
                  style={{
                    marginLeft: '2em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                  }}
                >
                  {replies?.map(
                    ({
                      sub_comment_id,
                      lang,
                      sub_comment_name,
                      sub_comment_timestamp,
                      likecount,
                      userdetails: { userid, userimage, username },
                    }) => {
                      return (
                        <Comment
                          key={uuidv4()}
                          timestamp={sub_comment_timestamp}
                          userName={username}
                          comment={sub_comment_name}
                          userProfileImage={userimage}
                          likecount={likecount}
                          userId={userid}
                          lang={lang}
                          commentId={comment_id}
                          subCommentId={sub_comment_id}
                          isLikedByCurrentUser={userLikedCommentIds?.includes(
                            sub_comment_id
                          )}
                          articleId={articleId}
                          newsLanguage={newsLanguage}
                          // isChildComment={true}
                        />
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}

export default React.memo(Comments);
