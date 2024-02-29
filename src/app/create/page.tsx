import FormNewPost from "@/components/FormNewPost"
import { getCurrentUsser } from "@/lib/session"

export const metadata = {
  title: "Inkpot - New Post",
  description: "Create a new blog post.",
}

const NewPost = async() => {
  const user = await getCurrentUsser();
  return (
    <div className="main">
        <div className="center">
          {user?.email? (
            <FormNewPost />
          ):(
            <h3><center>You need to sign in to access this page.</center></h3>
          )}
        </div>
    </div>
  )
}
export default NewPost 