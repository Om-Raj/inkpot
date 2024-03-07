import BlogList from "@/components/BlogList";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session"
import Link from "next/link";
import { Suspense } from "react";
import { MdOutlineEdit } from "react-icons/md";

export const metadata = {
  title: "Inkpot - Profile",
  description: "User account section. Access and edit your blog posts.",
}
const Profile = async ({searchParams} : {searchParams?: {query?: string}}) => {
    const user = await getCurrentUser();
    // const posts = await prisma.post.findMany({
    //     where: {
    //         authorEmail: user?.email
    //     },
    //     orderBy: {
    //         createdAt: 'desc'
    //     },
    //     include: {
    //         author: {
    //             select: {
    //                 name: true
    //             }
    //         }
    //     }
    // })
    const query = searchParams?.query || '';

    return (
        <div className="main">
            {user?.email ? (
            <>
                <h1><center>Profile</center></h1>
                <section>
                    <h2>
                        <div className="flex items-center gap-4">
                            {user?.name}
                            <Link href='/profile/edit/name'>
                                <MdOutlineEdit />
                            </Link>
                        </div>
                    </h2>
                    <p className="mt-2 mb-6"><i>{user?.email}</i></p>
                    <div className="flex gap-4 flex-wrap">
                        <Button variant='default'>
                            <Link href='/profile/edit/password'>Change Password</Link>
                        </Button>
                        <Button variant='destructive'>
                            <Link href='/profile/delete'>Delete Account</Link>
                        </Button>
                    </div>
                </section>
                <section>
                <h2>My Posts</h2>
                    <Suspense fallback={<LoadingSpinner position="relative"/>}>
                        <BlogList authorEmail={user.email} />
                    </Suspense>
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