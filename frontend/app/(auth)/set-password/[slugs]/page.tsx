"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import logingif from "../../../public/login.gif";
import typing from "../../../public/typing.gif";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../../../Context/AuthContext";
import { getallBlogs, handleSetNewPassword, loginFn } from "@/app/api/lib/api";
import { LOGIN_USER, SET_NEW_PASSWORD } from "@/app/types/user";
import axios, { AxiosResponse } from "axios";
import AuthButton from "@/app/Context/oauth";
import { useSession } from "next-auth/react";
import { useBlog } from "@/app/Context/BlogContext";
import { Label } from "@/components/ui/label";


const Page = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<SET_NEW_PASSWORD>();
    const { toast } = useToast();
    const { login } = useAuth();
    const { data: session, status } = useSession()
    const { handleBlogData } = useBlog();

    const pathname = usePathname();

    let Id = pathname.split('/')[2]

    const handleSetPassword: SubmitHandler<SET_NEW_PASSWORD> = async (data: SET_NEW_PASSWORD) => {

        try {

            const newdata = {
                password: data.password,
                userId: Id
            }
            console.log(newdata)
            const res = await handleSetNewPassword(newdata);
            if (res.msg === "Password updated successfully") {
                toast({ title: "Password Updated successfully" })
                router.push("/login")
            }
        } catch (error) {

            console.log(error)

        }

    }



    return (
        <div className="flex flex-col justify-center items-center h-screen">

            <div className="flex justify-center gap-4 flex-col shadow-xl shadow-slate-800    rounded-xl p-8  md:p-24 w-full md:w-[50rem] ">

                <div className="flex flex-col gap-2">
                    <Label className="">Enter New Password</Label>
                    <Input type="text" {...register("password")} placeholder="Enter new password" />
                </div>


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
