"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { title } from "process";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { register, handleSubmit } = useForm();

  const handleCreatePost = (data) => {
    console.log(data);
  };
  return (
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
  );
};

export default page;
