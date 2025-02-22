"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { title } from "process";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ProtectedRoute from "../Context/ProtectedRoute";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface PostData {
  title: string;
  content: string;
  coverImgUrl: FileList;
}

const page = () => {
  const { register, handleSubmit } = useForm<PostData>();
  const router = useRouter();
  const handleCreatePost: SubmitHandler<PostData> = async (data: PostData) => {
    const formData = new FormData();
    const getCookie = Cookies.get("token");
    formData.append("coverImage", data.coverImgUrl[0]); // Extract first file
    formData.append("title", data.title);
    formData.append("content", data.content);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}blog/create-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getCookie}`,
          },
        }
      );
      toast({ title: res.data?.msg });
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Somehting went wrong with ", error.message);
    }
  };
  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-3 justify-center p-20">
        <div>
          <Label>Add Cover Image </Label>
          <Input
            placeholder="Add File"
            className="border border-black"
            type="file"
            {...register("coverImgUrl")}
          />
        </div>
        <div>
          <Label>Write Title </Label>
          <Input
            placeholder="Enter Your Post Title"
            className="border border-black"
            {...register("title")}
          />
        </div>
        <div>
          <Label>Write Content </Label>
          <Textarea
            className="w-full h-[20rem] border border-black"
            placeholder="Write Your Content Here ...."
            {...register("content")}
          />
        </div>
        <div>
          <Button onClick={handleSubmit(handleCreatePost)} type="submit">
            Create Post
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default page;
