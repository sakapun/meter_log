import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface IAuthContext {
  isLoggedIn: boolean;
  user: User | null;
}

const AuthContext = createContext<IAuthContext>({ isLoggedIn: false, user: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user }}>{children}</AuthContext.Provider>
  );
};
