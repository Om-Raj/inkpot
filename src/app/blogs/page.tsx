import BlogList from "@/components/BlogList"
import prisma from "@/lib/db"

export const metadata = {
  title: "Inkpot - Blogs",
  description: "All blogs written by Inkpot users."
}

const BlogsPage = async () => {

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: {
          name: true,
        }
      }
    }
  })

  return (
    <main className="main">
      <h1><center>All Posts</center></h1>
      <BlogList posts={posts} />
    </main>
  )
}
export default BlogsPage