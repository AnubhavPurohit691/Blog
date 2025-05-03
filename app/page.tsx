import { BlogPostCard } from "@/components/BlogPostCard";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type BlogData = {
  id: string;
  title: string;
  content: string;
  ImageUrl?: string | null;
  authorId: string;
  author: {
    name: string;
    id: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

async function getData() {
  const data: BlogData[] = await prisma.blog.findMany({
    select: {
      title: true,
      content: true,
      ImageUrl: true,
      author: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
      comments: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Welcome to <span className="text-primary">Bloggers</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover insightful articles and stories from our community of
            writers. Share your own experiences and connect with readers
            worldwide.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard/create">Start Writing</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard">Your Posts</Link>
            </Button>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Button variant="ghost" asChild>
            <Link href="/archive">View All</Link>
          </Button>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data.map((item: BlogData) => (
              <BlogPostCard
                data={{
                  ...item,
                  ImageUrl: item.ImageUrl ?? undefined,
                }}
                key={item.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium mb-4">No articles yet</h3>
            <p className="text-muted-foreground mb-8">
              Be the first to contribute to our community!
            </p>
            <Button asChild>
              <Link href="/dashboard/create">Create Your First Post</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
