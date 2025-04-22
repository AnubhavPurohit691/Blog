import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

// Server action that accepts the form data
async function getComment(formData: FormData) {
  "use server"
  
  const blogId = formData.get('blogId')?.toString()
  const comment = formData.get('comment')?.toString()
  
  if (!blogId || !comment) {
    throw new Error('Blog ID and comment are required')
  }
  const blog = await prisma.blog.findFirst({
    where: {
        id: blogId
    },
    include: {
        author: true
    }
  });

  if (!blog || !blog.author) {
    throw new Error('Blog or author not found');
  }

  await prisma.comment.create({
    data: {
      blogId,
      content: comment,
      authorId: blog.author.id // Extract the actual author ID
      // Add other required fields based on your schema
    }
  });

  revalidatePath(`/post/${blogId}`)
}

// Component that takes blogId as a prop
export default function Comment({ blogId }: { blogId: string }) {
  return (
    <div className="mt-4">
      <form action={getComment} className="flex gap-2">
        <input type="hidden" name="blogId" value={blogId} />
        <input 
          type="text" 
          name="comment" 
          placeholder="Add a comment..." 
          className="flex-1 p-2 border rounded"
          required
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
}