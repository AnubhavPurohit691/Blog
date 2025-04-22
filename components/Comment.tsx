import { prisma } from '@/lib/db'

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
}

// Component that takes blogId as a prop
export default function Comment({ blogId }: { blogId: string }) {

  return (
    <div>
      <form action={getComment}>
        {/* Hidden input to pass the blogId */}
        <input type="hidden" name="blogId" value={blogId} />
        <input type="text" name="comment" placeholder="Add a comment..." />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}