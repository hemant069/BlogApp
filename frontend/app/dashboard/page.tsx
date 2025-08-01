"use client";

import Blogs from "../components/Blogs";
import { BlogContextType, useBlog } from "../Context/BlogContext";

const Page = () => {
  const { data }: BlogContextType = useBlog();

  return (
    <div className="flex flex-col gap-10 justify-center items-center ">
      {data?.map((item) => (
        <Blogs
          key={item._id}
          newid={item._id}
          title={item.title}
          content={item.content}
          image={item.coverImgUrl}
          createdBy={item.createdBy}
          user={item.user}
          tag={item.tag}
        />
      ))}
    </div>
  );
};

export default Page;
