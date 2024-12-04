'use client';
import { useReplyingUser } from '@/context/replyingUser';
import { useSession } from 'next-auth/react';
import React from 'react';
import FallbackImage from '../FallbackImage';

function CommentInput({ handleOnCommentSubmit, inputRef }) {
  const { data: session } = useSession();
  const { replyingTo, handleOnSetReplyingTo } = useReplyingUser();

  return (
    <div className="fixed bottom-[61px] bg-black w-[100%]">
      {replyingTo?.username && (
        <div className="text-[#fff] text-[12px] flex justify-center gap-[1em] w-[100%]">
          <div class="flex items-center justify-center mb-2.5">
            <div class="text-white text-lg font-normal">
              replying to{' '}
              <span class="bg-red-500 px-1.5 rounded font-semibold mx-1">
                {' '}
                {replyingTo?.username}
              </span>
            </div>
            <div class="ml-2.5">
              <button
                onClick={() =>
                  handleOnSetReplyingTo({ mainCommentId: null, username: null })
                }
                class="text-white text-sm no-underline"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 p-2">
        <FallbackImage
          sr={session?.user?.image}
          userFallback={true}
          alt="User"
          className={'w-[35px] h-[35px] rounded-[50%]'}
        />
        <input
          type="text"
          placeholder="Enter a comment"
          ref={inputRef}
          className="w-full p-2 text-base border border-gray-300 rounded-md outline-none"
        />
        <img
          src="https://www.hitzfeed.com/trends/media/flashcard/send-icon-1.svg"
          alt="Send"
          onClick={() => handleOnCommentSubmit(inputRef?.current?.value)}
          className="w-[30px] h-[30px] cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CommentInput;
