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
  const userId = String(session?.user.id)
  const data = await getData(userId)
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
          {/* {data.map((item)=>{
            <BlogPostCard data={item} key={item.id}/>
          })} */}
      </div>
    </div>
  )
}
