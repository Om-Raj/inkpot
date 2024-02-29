import { Post } from "@prisma/client"
import { format } from "date-fns"
import Link from "next/link"
import { FC } from "react"

interface BlogListProps {
    posts: Post[],
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