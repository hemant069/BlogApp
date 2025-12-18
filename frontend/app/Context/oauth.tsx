"use client";
import { Button } from "@/components/ui/button";
import { signIn, } from "next-auth/react";
export default function AuthButton() {
  const handleLogin = () => {


    signIn("google", { callbackUrl: "/dashboard" }); // redirect after login
  };

  return (

    <Button
      onClick={handleLogin}
      variant="default"
      className="flex items-center gap-2"
    >
      Continue with Google
    </Button>

  );
}
