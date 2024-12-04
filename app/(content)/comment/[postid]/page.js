'use client';
import CommentHeader from '@/components/comment/CommentHeader';
import CommentInput from '@/components/comment/CommentInput';
import NoCommentsMessage from '@/components/comment/NoCommentsMessage';
import { useSession } from 'next-auth/react';
import { useReplyingUser } from '@/context/replyingUser';
import React, { useEffect, useState, useRef } from 'react';
import Comments from '@/components/comment/Comments';
import Pusher from 'pusher-js';
import { randomCommentID } from '@/utils/randomCommentId';
import { commentService } from '@/services/commentService';
import useResource from '@/hooks/useResource';
import { notify } from '@/utils/Toast';
import Cookies from 'js-cookie';
import Loader from '@/components/Loader';
import FullScreenLayout from '@/layouts/FullScreenLayout';
import { ReplyProvider } from '@/context/replyingUser';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '@/components/Fallback';

function CommentSection({ params }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newsLanguage, setNewsLanguage] = useState('');
  const containerRef = useRef(null);

  const [userLikedCommentIds, setUserLikedCommentIds] = useState([]);
  const inputRef = useRef(null);

  const { postid } = params;

  const { replyingTo, handleOnSetReplyingTo } = useReplyingUser();
  const {
    isLoading: isCommentsLoading,
    fetchData: fetchComments,
    data: commentsData,
    error: commentsLoadingError,
  } = useResource(commentService?.getComments);

  const {
    isLoading: isCommentPosting,
    fetchData: fetchNewlyPostedComments,
    data: newComments,
    error: commnetsPostingError,
  } = useResource(commentService?.postComment);

  const userId = Cookies.get('userId');

  useEffect(() => {
    (async () => {
      const { result: postComments, userlikecommentid } = await fetchComments({
        articleId: postid,
        userId: userId,
      });

      setComments(postComments?.comments);
      setUserLikedCommentIds(userlikecommentid);
      setNewsLanguage(postComments?.lang);
    })();
  }, []);

  useEffect(() => {
    // Scroll the container to the bottom whenever comment is added
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [comments]);

  useEffect(() => {
    //pushers configuration
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: 'ap2',
    });

    // Subscribe to a specific article's comment channel
    const channel = pusher.subscribe(`comment-channel`);

    // Bind to the 'new-reply' event
    channel.bind(`article_id-${postid}`, (response) => {
      const { data } = response;
      const {
        comment_id,
        lang,
        main_comment_id,
        comment_text,
        user_id,
        userimage,
        username,
        timestamp,
        likecount,
      } = data;
      let newComment;
      if (main_comment_id === '0') {
        newComment = {
          comment_id,
          lang,
          comment_name: comment_text,
          comment_timestamp: timestamp,
          likecount,
          userdetails: {
            userid: user_id,
            userimage: userimage,
            username: username,
          },
        };
        const prevCommentsCopy = [...comments];
        prevCommentsCopy.push(newComment);

        setComments(prevCommentsCopy);
      } else {
        newComment = {
          sub_comment_id: comment_id,
          lang,
          sub_comment_name: comment_text,
          sub_comment_timestamp: timestamp,
          likecount,
          userdetails: {
            userid: user_id,
            userimage: userimage,
            username: username,
          },
        };
        setComments((prevComments) => {
          return prevComments.map((com) => {
            if (com.comment_id === main_comment_id) {
              return {
                ...com,
                replies: [...(com.replies || []), newComment],
              };
            }
            return com;
          });
        });
      }
    });

    // Cleanup subscription when the component is unmounted
    return () => {
      pusher.unsubscribe(`comment-channel`);
    };
  }, [comments, postid]);

  if (commnetsPostingError || commentsLoadingError) {
    throw new Error('Something went wrong !');
  }
  const handleOnCommentSubmit = async (commentText) => {
    if (commentText.length === 0) {
      notify({ message: 'please enter the text', isError: true });
      return;
    }

    if (!replyingTo.mainCommentId) {
      /*  func(requestBody:) */

      await fetchNewlyPostedComments({
        requestBody: {
          main_comment_id: 0,
          comment_id: randomCommentID(),
          user_id: userId,
          articleid: postid,
          comment_text: commentText,
          userimage: session?.user?.image,
          username: session?.user?.name,
          channel_socketid: 48047.24209,
          lang: newsLanguage,
        },
      });
    } else {
      await fetchNewlyPostedComments({
        requestBody: {
          main_comment_id: replyingTo.mainCommentId,
          comment_id: randomCommentID(),
          user_id: userId,
          articleid: postid,
          comment_text: commentText,
          userimage: session?.user?.image,
          username: session?.user?.name,
          channel_socketid: 48047.24209,
          lang: newsLanguage,
        },
      });
    }
    inputRef.current.value = '';
    handleOnSetReplyingTo({
      mainCommentId: null,
      username: null,
    });
    notify({ message: 'Posted comment successfully' });
  };

  return (
    <>
      <CommentHeader />
      {commentsData && comments?.length === 0 && <NoCommentsMessage />}
      {(isCommentPosting || isCommentsLoading) && <Loader />}

      <Comments
        comment={comments}
        newsLanguage={newsLanguage}
        articleId={postid}
        userLikedCommentIds={userLikedCommentIds}
        containerRef={containerRef}
      />

      <CommentInput
        handleOnCommentSubmit={handleOnCommentSubmit}
        inputRef={inputRef}
      />
    </>
  );
}

export default CommentSection;
