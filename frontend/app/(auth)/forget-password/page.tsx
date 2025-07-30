"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import logingif from "../../../public/login.gif";
import typing from "../../../public/typing.gif";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, useToast } from "@/hooks/use-toast";
import { useAuth } from "../../Context/AuthContext";
import { getallBlogs, handleForgetPassword, handleVerifyOtp, loginFn } from "@/app/api/lib/api";
import { FORGET, LOGIN_USER } from "@/app/types/user";
import axios, { AxiosResponse } from "axios";
import AuthButton from "@/app/Context/oauth";
import { useSession } from "next-auth/react";
import { useBlog } from "@/app/Context/BlogContext";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"


const Page = () => {
    const { register, handleSubmit } = useForm<FORGET>();
    const [show, setshow] = useState<boolean>(false)
    const [value, setValue] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter()

    const handleForgetPass: SubmitHandler<FORGET> = async (data: FORGET) => {



        try {

            const res = await handleForgetPassword(data)
            return res;


        } catch (error) {

            console.log(error)

        }



    }


    const handleData = handleSubmit(async (data) => {
        try {
            const res = await handleForgetPassword(data);

            if (res.msg !== "user is not found") {
                setEmail(data.email);   // store for later use
                setshow(true);
            }
            toast({ title: "User is Not Found" })          // show OTP input
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message || "Something went wrong";
                console.error(msg); // toast(msg)
            }
        }
    });


    const handleVerify = async () => {


        const data = {
            email,
            otp: value
        }
        console.log(data)
        const responseData = await handleVerifyOtp(data)
        console.log(responseData.userId)
        router.push(`/set-password/${responseData.userId}`)

    }


    return (
        <div className="flex flex-col justify-center items-center h-screen">

            <div className="flex justify-center gap-4 flex-col shadow-xl shadow-slate-800    rounded-xl p-8  md:p-24 w-full md:w-[50rem] ">

                {show ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-center">
                            <InputOTP
                                maxLength={6}
                                value={value}
                                onChange={(value) => setValue(value)}
                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <Button onClick={handleVerify}>Verify OTP</Button>
                    </div>
                )
                    :

                    <>
                        <Input disabled={show} type="email" {...register("email")} placeholder="Enter email" />
                        <Button onClick={handleData}>Forget Password</Button>
                    </>

                }
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
    )
}

export default Page