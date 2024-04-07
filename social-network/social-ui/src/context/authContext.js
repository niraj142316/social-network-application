import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8000/api/auth/login", inputs,{
      withCredentials:true,
    });
    setCurrentUser(res.data);
  };
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(currentUser));
  },[currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};