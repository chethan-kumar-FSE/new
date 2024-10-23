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
import Backdrop from '@/share/backdrop';
import { useBackdropContext } from '@/context/backdrop';
import Loader from '@/share/Loader';

function CommentSection({ params }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newsLanguage, setNewsLanguage] = useState('');
  const containerRef = useRef(null);

  const [userLikedCommentIds, setUserLikedCommentIds] = useState([]);
  const inputRef = useRef(null);
  const { toggleBackdropStatus } = useBackdropContext();

  const { postid } = params;

  const { replyingTo, handleOnSetReplyingTo } = useReplyingUser();
  const {
    isLoading: isCommentsLoading,
    fetchData: fetchComments,
    data: commentsData,
  } = useResource(commentService.getComments);

  const {
    isLoading: isCommentPosting,
    fetchData: fetchNewlyPostedComments,
    data: newComments,
  } = useResource(commentService.postComment);

  const userId = Cookies.get('userId');

  useEffect(() => {
    (async () => {
      const response = await fetchComments({
        articleId: postid,
        userId: userId,
      });
      setComments(response?.result?.comments);
      setUserLikedCommentIds(response?.userlikecommentid);
      setNewsLanguage(response?.result?.lang);
    })();
  }, [postid,userId]);


  useEffect(() => {
    // Scroll the container to the bottom whenever items change
    console.log('consinerre', containerRef?.current);
    if (containerRef.current) {
      console.log('height', containerRef.current.scrollHeight);
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [comments]);

  useEffect(() => {
    // Configure Pusher client

    //mine sample key aa40597b5984749588d8
    const pusher = new Pusher('cb14134dbac023ae7d02', {
      cluster: 'ap2',
    });

    // Subscribe to a specific article's comment channel
    const channel = pusher.subscribe(`comment-channel`);

    // Bind to the 'new-reply' event
    channel.bind(`article_id-${postid}`, (response) => {
      console.log('Reponedata from-article', response);

      const { data, article_id } = response;
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
        console.log('main comentid', main_comment_id);
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
        console.log('comments-special', comments, newComment);
        const prevCommentsCopy = [...comments];
        prevCommentsCopy.push(newComment);

        setComments(prevCommentsCopy);
      } else {
        console.log('exuecintg---secon', newComment);
        newComment = {
          sub_comment_id: comment_id,
          lang,
          sub_comment_name: comment_text,
          /* "sub_comment_added_date": "15-10-2024 05:46:15 am",
            "sub_comment_modified_date": "15-10-2024 05:46:15 am", */
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

  const handleOnCommentSubmit = async (commentText) => {
    if (commentText.length === 0) {
      notify({ message: 'please enter the text', isError: true });
      return;
    }
    toggleBackdropStatus();
    if (!replyingTo.mainCommentId) {
      /*  func(requestBody:) */

      const newCom = await fetchNewlyPostedComments({
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

      /*  const {
        comment_id,
        lang,
        main_comment_id,
        comment_text,
        user_id,
        userimage,
        username,
        timestamp,
        likecount,
      } = newCom.response;

      setComments((prevComments) => [
        ...prevComments,
        {
          comment_id,
          lang,
          comment_name: comment_text,
          comment_timestamp: timestamp,
          likecount,
          userdetails: {
            user_id,
            userimage,
            username,
          },
        },
      ]); */
    } else {
      console.log('hello tehre');

      const response = await fetchNewlyPostedComments({
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

      /*  const {
        comment_id,
        lang,
        main_comment_id,
        comment_text,
        user_id,
        userimage,
        username,
        timestamp,
        likecount,
      } = response.response; */

      //const commentsCopy = [...comments];
      /* 
      const updatedComments = commentsCopy.map((c) => {
        if (c.comment_id === main_comment_id) {
          const currentCommentReplies = c?.replies || [];
          const currentComment = {
            sub_comment_id: comment_id,
            lang,
            sub_comment_name: comment_text,
            sub_comment_timestamp: timestamp,
            likecount,
            userdetails: {
              user_id,
              userimage,
              username,
            },
          };

          return {
            ...c,
            replies: [...currentCommentReplies, currentComment],
          };
        }
        return c;
      }); */

      // setComments(updatedComments);
    }
    inputRef.current.value = '';
    handleOnSetReplyingTo({
      mainCommentId: null,
      username: null,
    });
    notify({ message: 'Posted comment successfully' });
    toggleBackdropStatus();
  };

  let content;
  if (isCommentsLoading) {
    content = (
      <p
        style={{
          color: 'white',
          fontSize: '14px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        Comments loading....
      </p>
    );
  } else {
    console.log('isCOment', isCommentPosting);
    content = (
      <>
        {commentsData && comments?.length === 0 && <NoCommentsMessage />}
        <Backdrop>
          <Loader />
        </Backdrop>

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

  return (
    <div>
      <CommentHeader />
      {content}
    </div>
  );
}

export default CommentSection;
