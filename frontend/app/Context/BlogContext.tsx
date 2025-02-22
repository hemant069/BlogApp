"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
interface BlogContextType {
  handleBlogData: () => void;
  data: BlogData[] | null;
}

interface BlogData {
  title: string;
  content: string;
  coverImgUrl: string;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<BlogData[] | null>([]);

  const handleBlogData = async () => {
    try {
      const getCookie = Cookies.get("token");

      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}blog`, {
        headers: {
          Authorization: `Bearer ${getCookie}`,
        },
      });
      const data = res.data.post;
      setData(data);
    } catch (error: any) {
      console.log("Something wrong with", error.message);
    }
  };

  useEffect(() => {
    handleBlogData();
  }, []);

  return (
    <BlogContext.Provider value={{ data }}>{children}</BlogContext.Provider>
  );
};

export const useBlog = () => {
  const Blog = useContext(BlogContext);

  if (!Blog) {
    console.log("Something went wrong with use Blog");
  }

  return Blog;
};
