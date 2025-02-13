"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface BlogContextType {
  handleBlogData: () => void;
  data: BlogData[];
}

interface BlogData {
  title: string;
  content: string;
  coverImgUrl: string;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<BlogData[]>([]);

  const handleBlogData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}blog`);
      const data = res.data;
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
