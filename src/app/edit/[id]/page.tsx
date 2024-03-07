import FormEditPost from "@/components/FormEditPost"
import prisma from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { FC } from "react"

interface EditPostPageProps {
    params: {
        id: string
    }
}

const EditPostPage: FC<EditPostPageProps> = async ({params}) => {
    const user = await getCurrentUser();
    const post = await prisma.post.findUnique({
        where: {
            id: params.id
        }
    })
    return (
        <div className="main">
            <div className="center">
                <h1>Edit Post</h1>
                {(!post?.id || post.authorEmail!==user?.email) ? (<>
                    <h3>
                        <center>You are not authorised to edit this post.</center>
                    </h3>
                </>):(
                    <FormEditPost id={post.id} title={post.title} content={post.content} authorEmail={post.authorEmail}/>
                )}
            </div>
        </div>
    )
}
export default EditPostPage