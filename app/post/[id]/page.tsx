import Comment from '@/components/Comment'
import { prisma } from '@/lib/db'
import React from 'react'

interface Comment {
  id: string
  content: string
  createdAt: Date
}

interface Blog {
  id: string
  comments: Comment[]
}

export default async function Posts({ params}: { params: { id: string } }) {
  const id = params.id
  const data = await prisma.blog.findFirst({
    where: {
      id: id
    },
    include: {
      comments: {
        orderBy: { createdAt: 'desc' }
      },
    },
  })
  console.log(data)

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      
      <div className="space-y-4 mb-8">
        {data?.comments?.length ? (
          data.comments.map((comment:any) => (
            <div key={comment.id} className="border p-4 rounded-lg">
              <p className="text-gray-800">{comment.content}</p>
              <small className="text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet</p>
        )}
      </div>

      <Comment blogId={data?.id || ''} />
    </div>
  )
}
