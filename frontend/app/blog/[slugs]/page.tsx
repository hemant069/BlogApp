"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { addCommentOnPost, getsingleBlog } from "@/app/api/lib/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { COMMENT } from "@/app/types/blog";
import { useAuth } from "@/app/Context/AuthContext";

interface BlogType {
  title: string;
  content: string;
  coverImgUrl: string;
}
const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const { user } = useAuth();
  console.log(user);
  const { handleSubmit, register } = useForm<COMMENT>();

  const [blog, setBlog] = useState<BlogType | null>();

  const handleBlog = async () => {
    try {
      const res = await getsingleBlog(id);
      const data = res.data;
      setBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment: SubmitHandler<COMMENT> = async (comment: COMMENT) => {
    //content, userId, blogId, parentcommentId
    // content:string,
    // user:string,
    // blog:string,
    // parentComment?:string
    const token = Cookies.get("token");
    let tokenId;
    if (token) {
      const userId = jwtDecode(token);
      tokenId = userId.id;
    }

    const data = {
      ...comment,
      userId: tokenId,
      blogId: id,
    };

    try {
      const res = await addCommentOnPost(data);
      console.log(res);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    handleBlog();
  }, [pathname]);

  // console.log(blog);

  if (!blog) return <h1>Loading</h1>;

  return (
    <div className="flex justify-center flex-col items-center mt-10 gap-3">
      <div>
        <Image
          src={blog?.coverImgUrl || "/blog.png"}
          width={400}
          height={200}
          alt={blog?.coverImgUrl || "blog image"}
          priority={true}
        />
      </div>
      <div>
        <p className="text-5xl ">{blog?.title}</p>
      </div>
      <div>
        <p>{blog?.content}</p>
      </div>
      <div className="flex gap-2 items-center">
        <Input type="text" {...register("content")} />
        <Button onClick={handleSubmit(addComment)}>Add</Button>
      </div>
    </div>
  );
};

export default Page;
