"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
export default function AuthButton() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    console.log("Session data:", session);
    console.log("Session status:", status);
    if (status === "authenticated" && session?.user?.email) {
      // Call your backend to exchange OAuth for your custom JWT
      fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          provider: "google",
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            Cookies.set("token", data.token); // Save JWT to cookies
            router.push("/dashboard"); // Redirect after login
          }
        });
    }
  }, [status, router]);
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" }); // redirect after login
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
