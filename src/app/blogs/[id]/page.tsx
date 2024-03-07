import Comments from "@/components/Comments"
import prisma from "@/lib/db"
import "./style.css"
import { FC } from "react"
import { format } from "date-fns"
import EditPostButton from "@/components/EditPostButton"
import DeletePostButton from "@/components/DeletePostButton"
import { getCurrentUser } from "@/lib/session"

interface BlogDetailPageProps {
  params: {
    id: string
  }
}

const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
  try {
    const user = await getCurrentUser();
    const post = await prisma.post.findFirst({
      where: {
        id: params.id,
      },
      include: {
        author: true,
      },
    });

  return (
    <main className="main">
      {post?(
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
        <Comments postId={params.id}/>
      </div>):(
        <div className="center">
          <h2>
            <center>
              The post you are looking for is not available.
            </center>
          </h2>
        </div>
      )}
    </main>
  )
  } catch(error) {
    console.log(error);
  }

}
export default BlogDetailPage