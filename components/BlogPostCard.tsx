import Image from "next/image";
import Link from "next/link";

interface IappProps {
  data: {
    id: string;
    title: string;
    content: string;
    ImageUrl?: string;
    authorId: string;
    author: {
      name: string, id: string
    }
    createdAt: Date;
    updatedAt: Date;
  };
}
export function BlogPostCard({ data }: IappProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/post/${data.id}`} className="block w-full h-full">
        <div className="relative h-48 w-full overflow-hidd2en">
          {data.ImageUrl ? (
            <Image
            src={data.ImageUrl}
            alt="Blog Image"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          ) : (
            <div className="bg-gray-200 h-full w-full flex items-center justify-center text-gray-500 text-sm">
              No image
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {data.title}
          </h3>

          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {data.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">

              <p className="text-sm font-medium text-gray-700">
                {data.author.name}
              </p>
            </div>

            <time className="text-xs text-black font-bold">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(data.createdAt)}
            </time>
          </div>
        </div>
      </Link>
    </div>
  );
}