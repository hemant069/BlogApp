"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const page = () => {
  // Here i have to add the user profile name

  const [isImage, setIsImage] = useState(false);
  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex flex-col justify-center items-center gap-2">
            {isImage ? (
              <Image
                width={20}
                height={20}
                alt="profile"
                src={"https://github.com/shadcn.png"}
              />
            ) : (
              <Avatar className="w-[10rem] h-[10rem]">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            )}
            <Button>Upload</Button>
            <div>
              <p className="text-lg text-neutral-500">
                Username <span className="text-black"> Hemant069</span>{" "}
              </p>
              <p className="text-lg text-neutral-500">
                Email{" "}
                <span className="text-black">
                  hemantprajapati7860@gmail.com
                </span>{" "}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
