import Comment from '@/components/Comment'
import { prisma } from '@/lib/db'
import React from 'react'

export default async function Posts({ params: { id } }: { params: { id: string } }) {
const data=await prisma.blog.findFirst({
  where:{
    id:id
  },include:{
    comments:{
    orderBy: { createdAt: 'desc' }
    }
  }
})
  return (
    <div>
      {data?.comments?.length ? (
        data.comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
            <Comment blogId={data?.id}/>
          </div>
        ))
      ) : (
        "No comments available"
      )}

    </div>
  )
}
