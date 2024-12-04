'use client';
import { useContext, createContext, useState } from 'react';
const UserCommonIdContext = createContext();

export const UserCommonIdProvider = ({ children, initialCommonId }) => {
  const [userCommonId, setUserCommonId] = useState(initialCommonId || '');

  return (
    <UserCommonIdContext.Provider value={{ setUserCommonId, userCommonId }}>
      {children}
    </UserCommonIdContext.Provider>
  );
};

export const useUserCommonId = () => useContext(UserCommonIdContext);
