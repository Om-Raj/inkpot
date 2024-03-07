import BlogList from "@/components/BlogList"
import LoadingSpinner from "@/components/LoadingSpinner"
import Search from "@/components/Search"
import prisma from "@/lib/db"
import { Suspense } from "react"

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
      <Suspense fallback={<LoadingSpinner position="relative"/>}>
        <BlogList query={query} />
      </Suspense>
    </main>
  )
}
export default BlogsPage