"use client"; // 👈 Make it a Client Component

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./Context/AuthContext";
import { BlogProvider } from "./Context/BlogContext";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <BlogProvider>
          {children}
          <Toaster />
        </BlogProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
