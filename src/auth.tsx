import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, analytics } from '../firebase';

export interface AuthContextType {
  user: firebase.default.User | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<firebase.default.User | null>(null);

  useEffect(() => {
    // ページビューのイベントをトラッキング
    analytics.logEvent('page_view');

    // 認証状態の変更をリッスン
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
