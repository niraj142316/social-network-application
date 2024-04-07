import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

  const toggle = () => {
    setDarkMode(!darkMode);
  };
  
  useEffect(()=>{
    localStorage.setItem("darkMode", darkMode);
  },[darkMode]);
  return (
    <ThemeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};