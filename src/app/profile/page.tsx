import BlogList from "@/components/BlogList";
import { getCurrentUsser } from "@/lib/session"

export const metadata = {
  title: "Inkpot - Profile",
  description: "User account section. Access and edit your blog posts.",
}
const Profile = async () => {

    const user = await getCurrentUsser();
    const posts = await prisma?.post.findMany({
        where: {
            authorEmail: user?.email
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return (
        <div className="main">
            {user?.email ? (
            <>
                <h1><center>Profile</center></h1>
                <h2>{user?.name}</h2>
                <i>{user?.email}</i>
                <section>
                <h2>My Posts</h2>
                    {posts?
                        <BlogList posts={posts} /> :
                        <h2>
                            <center>You have no posts yet.</center>
                        </h2>
                    }
                </section>
            </>) : (
            <h3>
                <center>You need to sign in to access this page.</center>
            </h3>
            )}
        </div>
    )
}
export default Profile