// import { Prisma } from "@prisma/client"
import prisma from "@/lib/db"
import { format } from "date-fns"
import Link from "next/link"
import { FC } from "react"

// const postWithAuthorName = Prisma.validator<Prisma.PostDefaultArgs>()({
//   include: {
//     author: {
//       select: {
//         name: true,
//       }
//     }
//   }
// })

// type PostWithAuthorName = Prisma.PostGetPayload<typeof postWithAuthorName>

// interface BlogListProps {
//     posts: PostWithAuthorName[] | undefined
// }

interface BlogListProps {
  query?: string,
  authorEmail?: string
}

const BlogList: FC<BlogListProps> = async ({ query, authorEmail }) => {
  let posts;
  if (authorEmail) {
    posts = await prisma.post.findMany({
      where: {
        authorEmail
      },
      include: {
        author: {
          select: {
            name: true
          }
        }
      }
    })
  } else if (query) {
    query = query.split(/\W+/).filter((val) => val!=='').join(' & ');
    posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              search: query,
              mode: 'insensitive'
            }
          },
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            content: {
              search: query,
              mode: 'insensitive'
            }
          },
          {
            content: {
              contains: query,
              mode: 'insensitive'
            }
          },
        ]
      },
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        author: {
          select: {
            name: true
          }
        }
      }
    })
  } else {
    posts = await prisma.post.findMany({
      take: 30,
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true
          }
        }
      }
    })
  }

  return (
    <div className="bloglist">
      {posts.length ? (
      <>
        { posts?.map((post) => (
          <Link className="post-card rounded-md" href={`/blogs/${post.id}`} key={post.id}>
            <h3>{post.title}</h3>
            <small>{format(post.createdAt, "MMM d, yyyy")}</small>
            <p className="post-card-content">{post.content.slice(0, 180 - Math.floor(Math.random() * 80))}...</p>
            <p className="post-card-username"><i>~ {post.author?.name}</i></p>
          </Link>
        ))}
      </>
      ):(
        <h3>
          <center>There are no posts available.</center>
        </h3>
      )}
    </div>
  )
}
export default BlogList