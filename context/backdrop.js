'use client';
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';

// Create Context
const BackdropContext = createContext();

// Create a custom hook to use the context
export const useBackdropContext = () => useContext(BackdropContext);

// Create a provider component
export const BackdropProvider = ({ children }) => {
  const [isBackdropOpen, setIsBackdropOpen] = useState(false); // Default theme

  const toggleBackdropStatus = useCallback(() => {
    setIsBackdropOpen((prevState) => !prevState);
  }, []);

  const data = useMemo(
    () => ({ isBackdropOpen, toggleBackdropStatus }),
    [isBackdropOpen]
  );

  return (
    <BackdropContext.Provider value={data}>{children}</BackdropContext.Provider>
  );
};
