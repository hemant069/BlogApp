"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import profileimag from "../../public/robot.jpeg";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  username: string;
  email: string;
  iat: number;
}

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userDetails, setuserDetails] = useState<User | null | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
      // You can add upload logic here or keep it separate
      console.log("File selected:", file);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decode = jwtDecode<User>(token);
      setuserDetails(decode);
    }
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex flex-col justify-center items-center gap-4 pt-6">
            <div className="relative border border-black p-5 rounded-full group">
              <Image
                width={100}
                height={100}
                className="w-full rounded-full"
                alt="profile"
                src={profileimag}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <label
                  htmlFor="file-upload"
                  className="bg-black/50 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-black/70"
                >
                  Upload
                </label>
                <input
                  id="file-upload"
                  className="hidden"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {selectedFile && (
              <p className="text-sm text-neutral-500">
                Selected: {selectedFile.name}
              </p>
            )}

            <div className="text-center">
              <p className="text-lg text-neutral-500">
                Username{" "}
                <span className="text-black">
                  {userDetails?.username || "username is not found"}
                </span>
              </p>
              <p className="text-lg text-neutral-500">
                Email <span className="text-black">{userDetails?.email}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
