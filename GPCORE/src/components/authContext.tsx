import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
}

const authContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const login = (id: string) => {
    setIsAuthenticated(true);
    setUserId(id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <authContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
