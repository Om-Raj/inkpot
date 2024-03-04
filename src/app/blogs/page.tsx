import BlogList from "@/components/BlogList"
import Search from "@/components/Search"
import prisma from "@/lib/db"

export const metadata = {
  title: "Inkpot - Blogs",
  description: "All blogs written by Inkpot users."
}

const BlogsPage = async ({searchParams} : {searchParams?: {query?: string}}) => {

  // const posts = await prisma.post.findMany({
  //   orderBy: {
  //     createdAt: 'desc',
  //   },
  //   include: {
  //     author: {
  //       select: {
  //         name: true,
  //       }
  //     }
  //   }
  // })
  const query = searchParams?.query;

  return (
    <main className="main">
      <h1><center>All Posts</center></h1>
      <Search placeholder="Search" />
      <BlogList query={query} />
    </main>
  )
}
export default BlogsPage