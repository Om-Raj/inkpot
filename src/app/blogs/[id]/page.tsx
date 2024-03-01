import Comments from "@/components/Comments"
import prisma from "@/lib/db"
import "./style.css"
import { FC } from "react"
import { format } from "date-fns"
import EditPostButton from "@/components/EditPostButton"
import DeletePostButton from "@/components/DeletePostButton"
import { getCurrentUsser } from "@/lib/session"

interface BlogDetailPageProps {
  params: {
    id: string
  }
}

const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
  const user = await getCurrentUsser();
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });
  console.log(post);

  return (
    <main className="main">
        <div>
          <div className="post-heading">
            <h2 className="post-heading-title">{post?.title}</h2>
            <div className="post-heading-detail">
              <div className="post-author">
                ~ <span>{post?.author?.name}</span>
              </div>
              <div className="post-date">
                {format(post!.createdAt, "MMM d, yyyy")}
              </div>
              {post?.id && user?.email && post.authorEmail===user.email && (
                <div className="post-heading-btns">
                  <EditPostButton id={post.id}/>
                  <DeletePostButton id={post.id} authorEmail={post.authorEmail} />
                </div>)
              }
            </div>
          </div>
          <div className="post-content">{post?.content}</div>
        </div>
        <Comments postId={params.id}/>
    </main>
  )
}
export default BlogDetailPage