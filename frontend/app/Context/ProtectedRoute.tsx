import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("usre", user);
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return user ? children : null;
};

export default ProtectedRoute;
