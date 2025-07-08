"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import logingif from "../../../public/login.gif";
import typing from "../../../public/typing.gif";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../../Context/AuthContext";
import { loginFn } from "@/app/api/lib/api";
import { LOGIN_USER } from "@/app/types/user";
import axios, { AxiosResponse } from "axios";
import AuthButton from "@/app/Context/oauth";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LOGIN_USER>();
  const { toast } = useToast();
  const { login } = useAuth();
  const { data: session, status } = useSession()

  interface Res {
    msg: string;
    token: string;
  }
  const handleLogin: SubmitHandler<LOGIN_USER> = async (data: LOGIN_USER) => {
    try {
      const res: AxiosResponse<Res> | undefined = await loginFn(data);
      console.log(res);
      if (!res) {
        console.log("Login failed");
        return;
      }
      if (res.status >= 202) {
        if (!res?.data?.token) {
          toast({ title: "Invaild Creads" });
        }
      }
      login(res?.data.token);
      toast({ title: "Login Success" });
      router.push("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({ title: error?.response?.data?.msg });
      } else if (axios.isAxiosError(error)) {
        toast({ title: "Network error. Please check your connection." });
      }
    }
  };
  useEffect(() => {
    if (status === "authenticated" && session.user?.email) {
      router.push("/dashboard")
    }
  }, [status])
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <AuthButton />
      <div className="flex justify-center gap-4 flex-col shadow-xl shadow-slate-800    rounded-xl p-8  md:p-24 w-full md:w-[50rem] ">
        <div className="flex justify-center gap-11 ">
          <Image
            className="  rounded-full "
            width={140}
            src={logingif}
            alt="login-gif"
          />
          <Image
            className=" hidden md:block rounded-full "
            width={140}
            src={typing}
            alt="typing-gif"
          />
        </div>
        <Input type="email" {...register("email")} placeholder="Enter email" />
        <Input
          className=""
          type="password"
          {...register("password")}
          placeholder="Enter password"
        />

        <Button onClick={handleSubmit(handleLogin)}>Login</Button>
        <div className="flex justify-around">
          <Link href={"#"}>
            <p className="text-blue-500">Forget Password</p>
          </Link>
          <Link href={"/signup"}>
            <p className="text-blue-500">Create a account</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
