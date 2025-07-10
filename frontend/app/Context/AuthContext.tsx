"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

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
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // NextAuth session for OAuth users
  const { data: session, status } = useSession();

  // Use ref to track previous session to avoid unnecessary re-renders
  const prevSessionRef = useRef<Session | null>(null);

  useEffect(() => {
    // Prevent running on every render - only run when truly needed
    if (isInitialized &&
      status !== "loading" &&
      JSON.stringify(session) === JSON.stringify(prevSessionRef.current)) {
      return;
    }

    const initializeAuth = async () => {
      try {
        // Check if user is authenticated via NextAuth (OAuth)
        if (status === "authenticated" && session?.user) {
          // Only log once during initialization
          if (!isInitialized) {
            console.log("session", session);
          }

          const oauthUser: User = {
            id: session.user?.mongoId || "",
            username: session.user.name || "",
            email: session.user.email || "",
            avatar: session.user.image || "",
          };

          setUser(oauthUser);
          setToken(null); // Clear any existing custom token
          setLoading(false);
          setIsInitialized(true);
          prevSessionRef.current = session;
          return;
        }

        // Only check for custom JWT token if not OAuth authenticated
        if (status !== "authenticated") {
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
        }

        // Set loading to false only when NextAuth is done loading
        if (status !== "loading") {
          setLoading(false);
          setIsInitialized(true);
        }

        prevSessionRef.current = session;
      } catch (error) {
        console.error("Auth initialization error:", error);
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [session?.user?.mongoId, session?.user?.email, status, isInitialized]);

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
    signOut({ redirect: false }); // Prevent automatic redirect
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