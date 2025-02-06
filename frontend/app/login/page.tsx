"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import logingif from "../../public/login.gif";
import typing from "../../public/typing.gif";
import Image from "next/image";
import { handleLoginFn } from "@/services/implementation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import cookies from "js-cookie";

interface submitData {
  email: string;
  password: string;
}

const page = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<submitData>();
  const { toast } = useToast();

  const handleLogin: SubmitHandler<submitData> = async (data: submitData) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}login`,
        data
      );

      if (res.status >= 202) {
        if (!res.data.token) {
          toast({ title: "Invaild Creads" });
        }
      }

      cookies.set("token", res.data.token);
      toast({ title: "Login Success" });
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response) {
        toast({ title: error?.response?.data?.msg });
      } else if (error.request) {
        toast({ title: "Network error. Please check your connection." });
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen    ">
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

export default page;
