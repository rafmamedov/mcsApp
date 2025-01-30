import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = useContext(AuthContext);