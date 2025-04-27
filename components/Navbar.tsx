import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import AuthButton from "./AuthButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user.email as string,
    },
  });
  if (!user) {
    await prisma.user.create({
      data: {
        email: session?.user.email as string,
        name: session?.user.name as string,
      },
    });
  }
  return (
    <div className="flex justify-between py-6 mx-10 ">
      <Link href={"/"} className="text-3xl ">
        Bloggers
      </Link>
      <div className="flex gap-10 text-xl">
        <AuthButton />
        <Link href={"/dashboard"}>Dashboard</Link>
        {session?.user.name}
        <ModeToggle />
      </div>
    </div>
  );
}
