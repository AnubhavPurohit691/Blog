"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import { mkdirSync } from "fs";
import path from "path";

export async function handleSubmit(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return redirect("/api/auth/signin");
  }

  const content = formData.get("content") as string;
  const title = formData.get("title") as string;
  const file = formData.get("image") as File;

  // file start

  if (!file || file.size === 0) {
    return;
  }

  const bytes = await file.arrayBuffer(); // read file into memory
  const buffer = Buffer.from(bytes); // convert to buffer

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  mkdirSync(uploadsDir, { recursive: true }); // make sure the folder exists

  const fileName = `${Date.now()}-${file.name}`; // unique filename
  const filePath = path.join(uploadsDir, fileName);
  console.log(filePath);
  await writeFile(filePath, buffer); // write file to disk

  // file end

  if (!title || !content) {
    throw new Error("Missing title or content");
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email as string,
    },
  });
  if (user?.id) {
    await prisma.blog.create({
      data: {
        content,
        title,
        authorId: user.id,
        ImageUrl: `/uploads/${fileName}`,
      },
    });
  } else {
    throw new Error("User ID is undefined");
  }

  revalidatePath("/");
  return redirect("/dashboard");
}
