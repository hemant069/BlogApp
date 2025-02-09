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
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setuser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(false);
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
    <AuthContext.Provider value={{ login, logout, user, token, loading }}>
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
