"use client";
import { Button } from "@/components/ui/button";
import { signIn, } from "next-auth/react";
export default function AuthButton() {
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" }); // redirect after login
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        onClick={handleLogin}
        variant="outline"
        className="flex items-center gap-2"
      >
        Continue with Google
      </Button>
    </div>
  );
}
