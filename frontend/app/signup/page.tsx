"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface submitData {
  username: string;
  email: string;
  password: string;
}

const page = () => {
  const { register, handleSubmit } = useForm<submitData>();

  const handleSignup: SubmitHandler<submitData> = (data: submitData) => {
    console.log("Hello", data);
  };
  return (
    <>
      <div>
        <h1 className="text-center">SignUp</h1>
      </div>
      <div className="flex flex-col justify-center ">
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
    </>
  );
};

export default page;
