"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import profileimag from "../../public/abstract-whale-webp.webp";
import { handleProfile } from "../api/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { UPDATE_PROFILE_INFO } from "../types/user";
import { useAuth } from "../Context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Camera, Edit3, User } from "lucide-react";


const Page = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user } = useAuth();


  const { register, handleSubmit, setValue, watch, reset } = useForm<UPDATE_PROFILE_INFO>({
    defaultValues: {
      username: user?.username || "",
    }
  });

  const watchedUsername = watch("username");

  // Handle file selection with preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      console.log("File selected:", file);
    }
  };

  // Handle profile update
  const handleProfileUpdate: SubmitHandler<UPDATE_PROFILE_INFO> = async (
    data: UPDATE_PROFILE_INFO
  ) => {
    setIsSubmitting(true);

    try {
      const formdata = new FormData();

      // Only append file if one is selected
      if (selectedFile) {
        formdata.append("profileImg", selectedFile);

      }

      formdata.append("username", data.username);
      formdata.append("userId", user?.id || "")

      console.log(selectedFile)
      console.log("file name here", data.profileImg.item)


      const res = await handleProfile(formdata);
      console.log("Profile update response:", res);


      if (res?.data) {
        console.log("response", res)
      }

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });

      setIsDialogOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);

    } catch (error) {
      console.error("Profile update error:", error);

      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message || "Failed to update profile",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };



  // Reset form when dialog closes
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    reset({ username: user?.username || "" });
  };

  // Load profile on mount need to understand


  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);


  let currentProfileImage: string | StaticImageData;

  if (!user?.avatar || user.avatar === "./images/default.png") {
    currentProfileImage = profileimag;
  } else {
    currentProfileImage = user.avatar as string;
  }





  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col justify-center items-center gap-6">

            {/* Edit Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit3 size={16} />
                  Edit Profile
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <User size={20} />
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription>
                    Update your profile information and photo.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-6">
                  {/* Profile Image Upload */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                        <Image
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          alt="profile"
                          src={previewUrl || currentProfileImage}
                        />
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-black/40">
                        <label
                          htmlFor="profile-upload"
                          className="bg-white text-black px-3 py-1 rounded-full cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
                        >
                          <Camera size={14} />
                          Change
                        </label>
                        <input
                          id="profile-upload"
                          className="hidden"
                          type="file"
                          accept=".png,.jpg,.jpeg"
                          {...register("profileImg")}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>

                    {selectedFile && (
                      <p className="text-sm text-green-600">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>

                  {/* Username Input */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      {...register("username", { required: "Username is required" })}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3">
                    <DialogClose asChild>
                      <Button type="button" variant="outline" onClick={handleDialogClose}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Update Profile"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Main Profile Display */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                  <Image
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    alt="profile"
                    src={currentProfileImage}
                  />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user?.username || "Unknown User"}
                </h2>
                <p className="text-gray-600">
                  {user?.email || "No email provided"}
                </p>
              </div>
            </div>


          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;