"use client";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    console.log("Session data:", session);
    console.log("Session status:", status);
    if (status === "authenticated") {
      router.push("/");
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
