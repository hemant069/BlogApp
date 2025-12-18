"use client";

import Blogs from "../components/Blogs";
import { BlogContextType, useBlog } from "../Context/BlogContext";

const Page = () => {
  const { data }: BlogContextType = useBlog();
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading amazing content...</h1>
          <p className="text-gray-500">Please wait while we fetch the blog for you</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto  grid grid-cols-1 gap-3 ">
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
