"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import profileimag from "../../public/robot.jpeg";
import { handlegetProfile, handleProfile } from "../api/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { UPDATE_PROFILE_INFO } from "../types/user";
import { useAuth } from "../Context/AuthContext";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [userDetails, setuserDetails] = useState<User | null | undefined>();
  const { user } = useAuth();

  const { register, handleSubmit } = useForm<UPDATE_PROFILE_INFO>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
      // You can add upload logic here or keep it separate
      console.log("File selected:", file);
    }
  };

  const handleProfileUpdate: SubmitHandler<UPDATE_PROFILE_INFO> = async (
    data: UPDATE_PROFILE_INFO
  ) => {
    const formdata = new FormData();

    formdata.append("profileImg", data.profileImg[0]);
    formdata.append("username", data.username);

    try {
      const res = await handleProfile(data);
      console.log(res);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  // update proflie start from here

  const handlegetUpdateProfile = async () => {
    try {
      if (!user?.id) {
        throw Error;
      }
      const res = await handlegetProfile(user.id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect load the once

  useEffect(() => {
    handlegetUpdateProfile();
  }, []);



  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex flex-col justify-center items-center gap-4 pt-6">
            <div>
              <Dialog>
                <DialogTrigger>
                  Edit
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="sr-only">
                      Are you absolutely sure?
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
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
                        {...register("profileImg")}
                      />
                    </div>
                  </div>
                  <div>
                    <Input {...register("username")} />
                  </div>
                  <div>
                    <Button onClick={handleSubmit(handleProfileUpdate)}>
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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
                Username <span className="text-black">{user?.username}</span>
              </p>
              <p className="text-lg text-neutral-500">
                Email <span className="text-black">{user?.email}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
