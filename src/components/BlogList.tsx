import { Prisma } from "@prisma/client"
import { format } from "date-fns"
import Link from "next/link"
import { FC } from "react"

const postWithAuthorName = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    author: {
      select: {
        name: true,
      }
    }
  }
})

type PostWithAuthorName = Prisma.PostGetPayload<typeof postWithAuthorName>

interface BlogListProps {
    posts: PostWithAuthorName[] | undefined
}

const BlogList: FC<BlogListProps> = ({posts}) => {
  return (
    <div className="bloglist">
        {posts?.map((post) => (
            <Link className="post-card" href={`/blogs/${post.id}`} key={post.id}>
                    <h3 className="h3">{post.title}</h3>
                    <small>{ format(post.createdAt, "MMM d, yyyy") }</small>
                    <p className="post-card-content">{post.content.slice(0, 180 - Math.floor(Math.random()*80))}...</p>
                    <p className="post-card-username"><i>~ {post.author?.name}</i></p>
            </Link>
        ))}
    </div>
  )
}
export default BlogList