"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getallBlogs } from "../api/lib/api";
interface BlogContextType {
  handleBlogData: () => void;
  data: BlogData[] | null;
}

interface author {
  email: string;
  profileImg: string;
  username: string;
  _id: string;
}
interface BlogData {
  title: string;
  content: string;
  coverImgUrl: string;
  createdBy?: author;
  tag?: string[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<BlogData[] | null>([]);

  const handleBlogData = async () => {
    try {
      const res = await getallBlogs();
      console.log(res);
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
