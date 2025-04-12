import Image from "next/image";
import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";

interface author {
  email: string;
  profileImg: string;
  username: string;
  _id: string;
}
interface BlogProps {
  image: string;
  content: string;
  title: string;
  newid: string;
  createdBy: author;
  user: string;
}
const Blogs = ({
  title,
  image,
  content,
  newid,
  createdBy,
  user,
}: BlogProps) => {
  const router = useRouter();

  const handleFullBlog = (newid: string) => {
    router.push(`/blog/${newid}`);
  };
  return (
    <div
      onClick={() => handleFullBlog(newid)}
      className="flex  cursor-pointer justify-around p-5 rounded-md w-[50rem] shadow-md  "
    >
      <div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              className="rounded-full"
              width={30}
              src="https://github.com/shadcn.png"
            />
          </Avatar>
          <p className="font-mono">{user || createdBy.username}</p>
        </div>
        <h1 className="text-3xl font-semibold font-sans">{title} </h1>
        <p className=" w-[30rem] line-clamp-2 text-neutral-500">{content}</p>
        <div className="cursor-pointer">Read More</div>
      </div>
      <div>
        <Image
          src={image}
          priority={true}
          alt={image}
          width={200}
          height={200}
          className="w-[15rem]"
        />
      </div>
    </div>
  );
};

export default Blogs;
