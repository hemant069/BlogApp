"use client";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const userToken = Cookies.get("token");

  if (userToken) {
    const decoded = jwtDecode(userToken);
  }

  const handleLogOut = () => {
    Cookies.remove("token");
  };

  return (
    <div className="flex justify-between px-4 md:justify-around  border py-5 items-center ">
      <div>
        <h1 className="text-2xl font-medium font-mono">MindVerse</h1>
      </div>
      <div className=" hidden  md:flex gap-6 font-sans items-center cursor-pointer">
        <div>Our story</div>
        <div>Write</div>
        {userToken ? null : (
          <div>
            <Link href={"/login"}>Sign in</Link>
          </div>
        )}
        {userToken ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogOut}>
                  LogOut
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="border rounded-2xl bg-black hover:bg-blue-800  text-white px-3 py-1">
            <Link href={"/signup"}>Get started</Link>
          </div>
        )}
      </div>
      <div className=" md:hidden border rounded-2xl bg-black hover:bg-blue-800  text-white px-3 py-1">
        <Link href={"/signup"}>Get started</Link>
      </div>
    </div>
  );
};

export default Navbar;
