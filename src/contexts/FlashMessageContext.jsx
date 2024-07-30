import React, { createContext, useContext, useState, useCallback } from 'react';

const FlashMessageContext = createContext();

export const useFlashMessage = () => {
  return useContext(FlashMessageContext);
};

export const FlashMessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const addMessage = useCallback((msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000); // Clear message after 5 seconds
  }, []);

  return (
    <FlashMessageContext.Provider value={addMessage}>
      {children}
      {message && <div className="flash-message">{message}</div>}
    </FlashMessageContext.Provider>
  );
};
