"use client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

interface BlogType {
  title: string;
  content: string;
  coverImgUrl: string;
}
const page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const [blog, setBlog] = useState<BlogType | null>();

  const token = Cookies.get("token");

  const handleBlog = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res?.data?.post;
      setBlog(data);
    } catch (error) {
      console.log(error);
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
    </div>
  );
};

export default page;
