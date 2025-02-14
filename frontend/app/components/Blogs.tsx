import Image from "next/image";
import React from "react";
import eg from "../../public/banner.jpg";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
//comment
const Blogs = () => {
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
        <h1 className="text-3xl font-semibold font-sans">My First Blog </h1>
        <p className=" w-[30rem] line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deleniti
          ullam quidem explicabo facilis perspiciatis illo fuga laborum ea alias
          reprehenderit nihil necessitatibus debitis nobis ex, consequuntur
          asperiores similique repellat.
        </p>
      </div>
      <div>
        <Image src={eg} alt="eg" width={200} />
      </div>
    </div>
  );
};

export default Blogs;
