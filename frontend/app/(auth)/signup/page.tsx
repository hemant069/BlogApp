"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import signup from "../../../public/signup.gif";
import typing from "../../../public/typing.gif";
import { handleSignupFn } from "@/services/implementation";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
interface submitData {
  username: string;
  email: string;
  password: string;
}

const page = () => {
  const { register, handleSubmit } = useForm<submitData>();
  const router = useRouter();
  const { toast } = useToast();
  //  check
  const handleSignup: SubmitHandler<submitData> = async (data: submitData) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}signup`,
        data
      );
      if (res.status == 201) {
        toast({ title: "Sign up Successfully 😊" });
        router.push("/login");
      }
    } catch (error) {
      console.log("something went wrong with handleSignup");
    }
  };

  return (
    <div className="flex flex-col h-screen  justify-center items-center ">
      <div className="flex flex-col justify-center w-[50rem] gap-3 p-8 md:p-24 shadow-lg shadow-slate-800  ">
        <div className="flex justify-center gap-11 ">
          <Image
            className="hidden md:block   rounded-full "
            width={145}
            src={signup}
            alt="signup-gif"
          />
          <Image
            className=" rounded-full "
            width={140}
            src={typing}
            alt="typing-gif"
          />
        </div>
        <Input type="text" {...register("username")} placeholder="Enter name" />
        <Input type="email" {...register("email")} placeholder="Enter email" />
        <Input
          type="password"
          {...register("password")}
          placeholder="Enter password"
        />
        <Button onClick={handleSubmit(handleSignup)}>SignUp</Button>
        <Link href={"/login"}>
          <p className="text-blue-500">Have an account ? Login</p>
        </Link>
      </div>
    </div>
  );
};

export default page;
