"use client";

import Blogs from "../components/Blogs";
import { useBlog } from "../Context/BlogContext";

interface BlogData {
  title: string;
  content: string;
  coverImgUrl: string;
  _id: string;
}
const page = () => {
  const { data }: BlogData[] = useBlog();

  console.log(data);

  return (
    <div>
      {data.map((item: BlogData, i) => (
        <Blogs
          key={item._id}
          title={item.title}
          content={item.content}
          image={item.coverImgUrl}
        />
      ))}
    </div>
  );
};

export default page;
