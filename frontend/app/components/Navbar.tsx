import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-around  border py-5 items-center ">
      <div>Logo</div>
      <div className=" hidden  md:flex gap-6 font-sans items-center cursor-pointer">
        <div>Our story</div>
        <div>Write</div>
        <div>
          <Link href={"/login"}>Sign in</Link>
        </div>
        <div className="border rounded-2xl bg-black hover:bg-blue-800  text-white px-3 py-1">
          <Link href={"/signup"}>Get started</Link>
        </div>
      </div>
      <div className=" md:hidden border rounded-2xl bg-black hover:bg-blue-800  text-white px-3 py-1">
        <Link href={"/signup"}>Get started</Link>
      </div>
    </div>
  );
};

export default Navbar;
