"use client";

import Blogs from "../components/Blogs";
import { BlogContextType, useBlog } from "../Context/BlogContext";

const Page = () => {
  const { data }: BlogContextType = useBlog();

  return (
    <div className="max-w-6xl mx-auto  grid grid-cols-2 gap-3 ">
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
