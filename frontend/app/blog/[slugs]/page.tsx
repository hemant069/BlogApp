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

  return (
    <div className="flex justify-center flex-col">
      <div>
        <Image
          src={blog?.coverImgUrl}
          width={200}
          height={200}
          alt={blog?.coverImgUrl}
        />
      </div>
      <div>
        <p>{blog?.title}</p>
      </div>
      <div>
        <p>{blog?.content}</p>
      </div>
    </div>
  );
};

export default page;
