import Image from "next/image";
import React from "react";
import banner from "../../public/banner.jpg";
import { Button } from "@/components/ui/button";

const Main = () => {
  return (
    <div className="flex justify-center md:justify-around ">
      <div className="flex flex-col gap-8 item-center justify-center">
        <div>
          <h1 className=" text-center md:text-left text-8xl font-sans ">
            Stories & Gems
          </h1>
        </div>
        <div>
          <p className=" text-center md:text-left text-xl md:text-3xl font-sans">
            A Place where you can read, write and share your thought{" "}
          </p>
        </div>
        <div className="flex justify-center md:block">
          <Button className=" flex flex-col justify-center items-center font-sans font-medium rounded-lg px-10 py-5 text-lg">
            Start writing
          </Button>
        </div>
      </div>
      <div className="hidden md:flex">
        <Image width={450} src={banner} alt="banner" />
      </div>
    </div>
  );
};

export default Main;
