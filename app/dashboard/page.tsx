import { BlogPostCard } from '@/components/BlogPostCard'
import { buttonVariants } from '@/components/ui/button'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

async function getData(userId:string){
 const data= await prisma.blog.findMany({
    where:{
      authorId:userId
    },
    orderBy:{
      createdAt:"desc"
    },
    include:{
      author:true,
      comments:{
        include:{
          author:true
        }
      }
    }
  })
  return data
}


export default async function Dashboard() {
  const session=await getServerSession()
  const user=await prisma.user.findFirst({
    where:{
      email:session?.user.email as string
    }
  })
  if (!user) {
    return <div>User not found</div>;
  }
  const data = await getData(user.id);
  console.log(data)
  return (
    <div className='px-16 pt-8'>
      <div className='flex items-center justify-between mb-4'>
        <div className='text-4xl font-medium'>
          Your Blog Articles
        </div>
        <Link href={"/dashboard/create"} className={buttonVariants({ variant: 'outline' })}>
          Create Posts
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data.map((item)=>{
           return  <BlogPostCard data={item} key={item.id}/>
          })}
      </div>
    </div>
  )
}
