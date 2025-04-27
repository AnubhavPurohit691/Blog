"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

export default function AuthButton() {
  const session = useSession();
  return (
    <div>
      {session.status === "unauthenticated" ? (
        <Button onClick={() => signIn("google")}>SignIn</Button>
      ) : (
        <Button onClick={() => signOut()}>Logout</Button>
      )}
    </div>
  );
}
