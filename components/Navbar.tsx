import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import AuthButton from "./AuthButton";


export default async function Navbar() {
  
 
  return (
    <div className="flex justify-between py-6 mx-10 ">
      <Link href={"/"} className="text-3xl ">
        Bloggers
      </Link>
      <div className="flex gap-10 text-xl">
        <AuthButton />
        <Link href={"/dashboard"}>Dashboard</Link>
        <ModeToggle />
      </div>
    </div>
  );
}
