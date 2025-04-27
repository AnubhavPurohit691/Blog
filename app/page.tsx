import { BlogPostCard } from "@/components/BlogPostCard";
import { prisma } from "@/lib/db";

async function getData() {
  const data = await prisma.blog.findMany({
    select: {
      title: true,
      content: true,
      ImageUrl: true,
      author: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
      comments: true,
      id: true
    }
  })
  return data
}

export default async function Home() {
  const data = await getData()
  
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insightful articles and stories from our community of writers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <BlogPostCard 
              data={{ 
                ...item, 
                ImageUrl: item.ImageUrl ?? undefined 
              }} 
              key={item.id} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}
