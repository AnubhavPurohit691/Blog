"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full text-black text-md font-bold"
      type="submit"
      disabled={pending}
    >
      Create Post
    </Button>
  );
};

export default SubmitButton;
