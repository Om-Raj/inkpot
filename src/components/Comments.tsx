import { FC } from "react"
import FormComment from "./FormComment"
import "./styles/comments.css"
import prisma from "@/lib/db"
import { formatDistanceToNowStrict } from "date-fns"
import DeleteCommentButton from "./DeleteCommentButton"
import { getCurrentUsser } from "@/lib/session"

interface CommentsProps {
	postId: string
}

const Comments: FC<CommentsProps> = async ({postId}) => {
	const comments = await prisma.comment.findMany({
		where: {
		postId,
		},
		orderBy: {
		createdAt: 'desc',
		},
		include: {
		author: true,
		}
	})
	const user = await getCurrentUsser();

	return (
		<div className="comments">
		<h3>Comments</h3>
		<FormComment postId={postId}/>
		<ul>
			{comments.map((comment) => (
			<li key={comment.id}>
				<div className="comment-card">
					<div className="comment-header">
						<p className="comment-header-author">~ <span>{comment.author?.name}</span></p>
						<div className="comment-header-date">
							<p>
								{formatDistanceToNowStrict(comment.createdAt)} ago
							</p>
							{ user?.email === comment.authorEmail && 
								<DeleteCommentButton commentId={comment.id} authorEmail={comment.authorEmail} />
							}
						</div>
					</div>
					<div className="comment-body">{comment.text}</div>
				</div>
			</li>
			))}
		</ul>
		</div>
	)
}
export default Comments