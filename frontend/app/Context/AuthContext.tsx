"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";

// interface User {
//   id: string;
//   username: string;
//   email: string;
//   avatar?: string;
// }

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

    const customToken = Cookies.get("token");


    if (customToken) {
      try {
        const decode: User = jwtDecode(customToken);
        setToken(customToken);
        setuser(decode);
      } catch (error) {
        console.log(error);
        logout();
      }
    }

    console.log(customToken)

    setLoading(false); // Move this INSIDE the effect, after token check
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
