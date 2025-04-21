"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleSubmit(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return redirect("/api/auth/signin");
  }

  const content = formData.get("content") as string;
  const title = formData.get("title") as string;

  if (!title || !content) {
    throw new Error("Missing title or content");
  }
  const user = await prisma.user.findFirst({
    where:{
        email:session.user.email as string
    }
  })
  if (user?.id) {
    await prisma.blog.create({
      data: {
        content,
        title,
        authorId: user.id,
      },
    });
  } else {
    throw new Error("User ID is undefined");
  }

  revalidatePath("/");
  return redirect("/dashboard");
}
