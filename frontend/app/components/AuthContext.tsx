"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setuser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = Cookies.get("token");

    if (getToken) {
      try {
        const decode: User = jwtDecode(getToken);
        setToken(getToken);
        setuser(decode);
      } catch (error) {
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    Cookies.set("token", token);
    const decode: User = jwtDecode(token);
    setuser(decode);
    setToken(token);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
    setuser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Something went wrong with context");
  }

  return context;
};
