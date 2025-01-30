"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface submitData {
  email: string;
  password: string;
}

const page = () => {
  const { register, handleSubmit } = useForm<submitData>();

  const handleLogin: SubmitHandler<submitData> = (data: submitData) => {};
  return (
    <div className="">
      <div className="text-center">
        <h1>Login Page</h1>
      </div>
      <div className="flex justify-center flex-col">
        <Input type="email" {...register("email")} placeholder="Enter email" />
        <Input
          type="password"
          {...register("password")}
          placeholder="Enter password"
        />
        <Button onClick={handleSubmit(handleLogin)}>Login</Button>
        <Link href={"/signup"}>
          <p className="text-blue-500">Create a account</p>
        </Link>
      </div>
    </div>
  );
};

export default page;
