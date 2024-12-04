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
      className="flex flex-col gap-4 max-h-[450px] overflow-y-auto no-scrollbar mx-0 my-20 py-4 px-4"
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
            <div key={comment_id} className="flex flex-col gap-[1em]">
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
                <div className="ml-[2em] flex flex-col gap-[1em]">
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
                          key={sub_comment_id}
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
