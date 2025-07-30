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
import { getallBlogs, handleVerifyOtp, loginFn } from "@/app/api/lib/api";
import { LOGIN_USER, VERIFY_OTP } from "@/app/types/user";
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
    const { register, handleSubmit } = useForm();
    const [value, setValue] = React.useState("")
    const router = useRouter();

    const handleVerify: SubmitHandler<VERIFY_OTP> = async () => {
        console.log("Hello")
        const otp = { value }
        const responseData = await handleVerifyOtp(otp)
        // router.push("/set-password")

    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">

            <div className="flex justify-center gap-4 flex-col shadow-xl shadow-slate-800    rounded-xl p-8  md:p-24 w-full md:w-[50rem] ">

                <div className="flex justify-center">
                    <InputOTP maxLength={6}
                        value={value}
                        onChange={(value) => setValue(value)} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                        <InputOTPGroup >
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />

                        </InputOTPGroup>
                    </InputOTP>
                </div>


                <Button onClick={handleSubmit(handleVerify)}>Verify Otp</Button>
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