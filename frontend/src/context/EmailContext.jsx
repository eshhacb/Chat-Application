// src/context/EmailContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const EmailContext = createContext();

// Create a custom hook to use the context
export const useEmailContext = () => {
  return useContext(EmailContext);
};

// Create a provider component that will wrap the parts of your app that need the context
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(null);  // Store the email here

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
