import Comment from "@/components/Comment";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
  };
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const data = await prisma.blog.findFirst({
    where: {
      id: resolvedParams.id,
    },
    include: {
      comments: {
        include: {
          author: true,
        },
        orderBy: { createdAt: "desc" },
      },
      author: true,
    },
  });

  if (!data) return notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Image */}
      {data.ImageUrl && (
        <div className="relative w-full h-[70vh] bg-black">
          <Image
            src={data.ImageUrl}
            alt={data.title}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              {data.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                <span className="text-sm font-medium">
                  {data.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium">{data.author.name}</p>
                <time className="text-sm text-gray-300">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(data.createdAt)}
                </time>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Content */}
        <article className="mb-16">
          {!data.ImageUrl && (
            <>
              <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                {data.title}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-10 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                  <span className="text-sm font-medium text-white dark:text-gray-900">
                    {data.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {data.author.name}
                  </p>
                  <time className="text-sm text-gray-600 dark:text-gray-400">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(data.createdAt)}
                  </time>
                </div>
              </div>
            </>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line text-lg">
              {data.content}
            </p>
          </div>
        </article>

        {/* Comments Section */}
        <section className="border-t border-gray-200 dark:border-gray-800 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Comments ({data.comments.length})
          </h2>

          <div className="space-y-8 mb-12">
            {data.comments.length > 0 ? (
              data.comments.map((comment) => (
                <div key={comment.id} className="group">
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-white dark:text-gray-900">
                        {comment.author?.name?.charAt(0).toUpperCase() || "A"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {comment.author?.name || "Anonymous"}
                        </p>
                        <span className="text-gray-400 dark:text-gray-500">
                          •
                        </span>
                        <time className="text-sm text-gray-500 dark:text-gray-400">
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                          }).format(comment.createdAt)}
                        </time>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400">
                  No comments yet. Start the conversation!
                </p>
              </div>
            )}
          </div>

          {/* Comment Form */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Leave a comment
            </h3>
            <Comment blogId={data.id} />
          </div>
        </section>
      </div>
    </div>
  );
}
export const revalidate = 60;
