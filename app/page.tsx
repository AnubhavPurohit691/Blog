import { BlogPostCard } from "@/components/BlogPostCard";
import { prisma } from "@/lib/db";

async function getData(){
 const data= await prisma.blog.findMany({
    select:{
      title:true,
      content:true,
      ImageUrl:true,
      author:true,
      createdAt:true,
      updatedAt:true,
      authorId:true,
      comments:true,
      id:true
    }
  })
  return data
}

export default async function Home() {
  const data=await getData()
  
  return (
    <main>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {data.map((item)=>{
                 return  <BlogPostCard data={item} key={item.id}/>
                })}
            </div>
    </main>
  );
}
