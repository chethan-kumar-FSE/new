'use client';
import { useReplyingUser } from '@/context/replyingUser';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useRef } from 'react';

function CommentInput({ handleOnCommentSubmit, inputRef }) {
  const { data: session } = useSession();
  const { replyingTo, handleOnSetReplyingTo } = useReplyingUser();

  ///const isReplying = true;

  return (
    <div
      style={{
        width: '100%',
        padding: '1em 1em',
        position: 'fixed',
        bottom: '65px',
        background: 'black',
      }}
    >
      {replyingTo.username && (
        <div
          style={{
            color: 'white',
            fontSize: '12px',

            display: 'flex',
            justifyContent: 'center',
            gap: '1em',
            width: '100%',
          }}
        >
          <p>
            Replying to{' '}
            <span
              style={{
                display: 'inline-block',
                background: 'red',
                fontWeight: 'bold',
                color: 'white',
                padding: '0.2em',
                borderRadius: '0.4em',
              }}
            >
              {replyingTo.username}
            </span>
          </p>
          <button
            onClick={() =>
              handleOnSetReplyingTo({ mainCommentId: null, username: null })
            }
          >
            clear
          </button>
        </div>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '0.5em',
          padding: '0.5em',
        }}
      >
        <Image
          src={session?.user?.image}
          alt="User"
          width={35}
          height={35}
          style={{ borderRadius: '50%' }}
        />
        <input
          type="text"
          placeholder="Enter a comment"
          ref={inputRef}
          style={{
            width: '100%',
            padding: '0.5em',
            fontSize: '1em',
            border: '1px solid #ccc',
            borderRadius: '5px',
            outline: 'none',
          }}
        />
        <Image
          src="https://www.hitzfeed.com/trends/media/flashcard/send-icon-1.svg"
          width={30}
          height={30}
          alt="Send"
          style={{ cursor: 'pointer' }}
          onClick={() => handleOnCommentSubmit(inputRef?.current?.value)}
        />
      </div>
    </div>
  );
}

export default CommentInput;
