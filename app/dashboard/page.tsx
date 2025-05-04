import { BlogPostCard } from "@/components/BlogPostCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import React from "react";

async function getData(userId: string) {
  return await prisma.blog.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      comments: { include: { author: true } },
    },
  });
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return <div>Please log in</div>;
  }

  const user = await prisma.user.findFirst({
    where: { email: session.user.email },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  const data = await getData(user.id);

  return (
    <div className="px-16 pt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl font-medium">Your Blog Articles</div>
        <Link
          href={"/dashboard/create"}
          className={buttonVariants({ variant: "outline" })}
        >
          Create Posts
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogPostCard
            data={{ ...item, ImageUrl: item.ImageUrl ?? undefined }}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}

export const revalidate = 60;
