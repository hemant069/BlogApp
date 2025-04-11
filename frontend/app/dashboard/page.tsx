"use client";

import Blogs from "../components/Blogs";
import { useBlog } from "../Context/BlogContext";
import { blogs } from "../types/blog";

const page = () => {
  const { data }: blogs[] = useBlog();

  console.log(data);

  return (
    <div className="flex flex-col gap-10 justify-center items-center ">
      {data.map((item: blogs) => (
        <Blogs
          key={item._id}
          newid={item._id}
          title={item.title}
          content={item.content}
          image={item.coverImgUrl}
          createdBy={item.createdBy}
          user={item.user}
        />
      ))}
    </div>
  );
};

export default page;
