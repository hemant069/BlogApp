import axios from "axios";
import { createContext, useState } from "react";

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

const BlogProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <BlogContext.Provider value={{ data }}>{children}</BlogContext.Provider>
  );
};
