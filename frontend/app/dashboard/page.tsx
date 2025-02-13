"use client";

import Blogs from "../components/Blogs";
import { useBlog } from "../Context/BlogContext";

const page = () => {
  const { data } = useBlog();

  console.log(data);

  return (
    <div>
      <Blogs />
    </div>
  );
};

export default page;
