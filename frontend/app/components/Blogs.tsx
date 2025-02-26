import Image from "next/image";
import React from "react";
import eg from "../../public/banner.jpg";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";

interface BlogProps {
  image: string;
  content: string;
  title: string;
  newid: string;
}
const Blogs = ({ title, image, content, newid }: BlogProps) => {
  const router = useRouter();

  const handleFullBlog = (newid: string) => {
    router.push(`/blog/${newid}`);
  };
  return (
    <div className="flex  justify-around">
      <div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              className="rounded-full"
              width={30}
              src="https://github.com/shadcn.png"
            />
          </Avatar>
          <p className="font-mono">Hemant Prajapati</p>
        </div>
        <h1 className="text-3xl font-semibold font-sans">{title} </h1>
        <p className=" w-[30rem] line-clamp-2">{content}</p>
        <div className="cursor-pointer" onClick={() => handleFullBlog(newid)}>
          Read More
        </div>
      </div>
      <div>
        <Image
          src={image}
          priority={true}
          alt={image}
          width={200}
          height={200}
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    </div>
  );
};

export default Blogs;
