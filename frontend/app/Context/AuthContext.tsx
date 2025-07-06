"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";
import { signOut } from "next-auth/react";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  isOAuthUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // NextAuth session for OAuth users
  const { data: session, status } = useSession();

  useEffect(() => {
    // Check if user is authenticated via NextAuth (OAuth)
    if (status === "authenticated" && session?.user) {
      // OAuth user - convert NextAuth session to your User format

      console.log("session", session)

      const oauthUser: User = {
        id: session.user.id || "",
        username: session.user.name || "",
        email: session.user.email || "",
        avatar: session.user.image || "",
      };
      setUser(oauthUser);
      setLoading(false);
      return;
    }

    // Check for custom JWT token (regular login)
    const customToken = Cookies.get("token");

    if (customToken) {
      try {
        const decoded: User = jwtDecode(customToken);
        setToken(customToken);
        setUser(decoded);
      } catch (error) {
        console.log("JWT decode error:", error);
        logout();
      }
    }

    setLoading(status === "loading");
  }, [session, status]);

  const login = (token: string) => {
    Cookies.set("token", token, { expires: 7 }); // Set expiry
    try {
      const decoded: User = jwtDecode(token);
      setUser(decoded);
      setToken(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const logout = () => {
    signOut()
    Cookies.remove("token");

    setToken(null);
    setUser(null);
  };

  const isOAuthUser = !!(session?.user && status === "authenticated");

  return (
    <AuthContext.Provider value={{ login, logout, user, token, loading, isOAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};