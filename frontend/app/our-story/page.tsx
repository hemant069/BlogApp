import Image from "next/image";
import React from "react";
import about from "../../public/robot.jpeg";

const Page = () => {
  return (
    <div className=" flex flex-col justify-center px-40">
      <h1 className="text-center text-xl font-bold m-6 font-mono ">About Us</h1>
      <p>
        It all started with a simple idea—an idea to create a space where people
        could freely express their thoughts, share experiences, and inspire the
        world. I had always admired platforms like Medium, where words carried
        power, where stories resonated with millions. But I wanted to build
        something of my own, something unique. And that’s how MindVerse was
        born.
      </p>
      <div className="flex flex-col justify-center items-center">
        <Image
          width={100}
          className="w-[25rem] rounded-lg bg-slate-50 "
          height={100}
          src={about}
          alt="about.png"

        />
      </div>
      <h3 className="text-lg font-semibold border border-slate-50 bg-white w-[12rem] rounded-md text-center">The Spark of an Idea</h3>
      <p className="ml-2">
        As someone who enjoyed reading blogs and exploring different
        perspectives, I realized that many platforms lacked a true sense of
        community. Some were cluttered with advertisements, while others
        restricted users creative freedom. I wanted to bridge that gap—a
        platform where people could not only write but also truly connect with
        one another. A digital space where words were more than just text on a
        screen—they were voices shaping narratives.
      </p>
    </div>
  );
};

export default Page;
