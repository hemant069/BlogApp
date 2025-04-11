"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ProtectedRoute from "../Context/ProtectedRoute";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CREATE_BLOG } from "../types/blog";
import { createBlogPost } from "../api/lib/api";

//comment
const Page = () => {
  const { register, handleSubmit } = useForm<CREATE_BLOG>();
  const router = useRouter();
  const handleCreatePost: SubmitHandler<CREATE_BLOG> = async (
    data: CREATE_BLOG
  ) => {
    const formData = new FormData();
    formData.append("coverImage", data.coverImgUrl[0]); // Extract first file
    formData.append("title", data.title);
    formData.append("content", data.content);

    try {
      const res = await createBlogPost(formData);
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
            accept=".png"
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

export default Page;
