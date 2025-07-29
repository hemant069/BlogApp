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
import { getallBlogs, loginFn } from "@/app/api/lib/api";
import { LOGIN_USER } from "@/app/types/user";
import axios, { AxiosResponse } from "axios";
import AuthButton from "@/app/Context/oauth";
import { useSession } from "next-auth/react";
import { useBlog } from "@/app/Context/BlogContext";


const Page = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<LOGIN_USER>();
    const { toast } = useToast();
    const { login } = useAuth();
    const { data: session, status } = useSession()
    const { handleBlogData } = useBlog();

    const handleSetPassword = () => {

    }



    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <AuthButton />
            <div className="flex justify-center gap-4 flex-col shadow-xl shadow-slate-800    rounded-xl p-8  md:p-24 w-full md:w-[50rem] ">

                <Input type="text" {...register("newpassword")} placeholder="Enter new password" />


                <Button onClick={handleSubmit(handleSetPassword)}>Set Password</Button>
                <div className="flex justify-around">
                    <Link href={"/login"}>
                        <p className="text-blue-500">Login</p>
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
