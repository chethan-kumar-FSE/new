'use client';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const ReplyContext = createContext();

export const ReplyProvider = ({ children }) => {
  const [replyingTo, setReplyingTo] = useState({
    mainCommentId: null,
    username: null,
  });

  const handleOnSetReplyingTo = useCallback(
    ({ mainCommentId, username }) => {
      setReplyingTo({
        mainCommentId,
        username,
      });
    },
    [replyingTo.mainCommentId, replyingTo.username]
  );

  const data = useMemo(() => {
    return { replyingTo, handleOnSetReplyingTo };
  }, [replyingTo.mainCommentId, replyingTo.username]);

  return <ReplyContext.Provider value={data}>{children}</ReplyContext.Provider>;
};

export const useReplyingUser = () => {
  const context = useContext(ReplyContext);
  if (!context) {
    throw new Error('useReplyingUser must be used within a ReplyProvider');
  }
  return context;
};
