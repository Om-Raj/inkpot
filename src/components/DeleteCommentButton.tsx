'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { MdDeleteOutline } from "react-icons/md"

interface DeleteCommentProps {
    commentId: string,
    authorEmail: string | null | undefined
}

const DeleteComment: FC<DeleteCommentProps> = ({commentId, authorEmail}) => {
    const router = useRouter();
	const handleDelete = async () => {
		try {
			const response = await axios.delete('/api/comments', {
				data: {
					commentId,
                    authorEmail
				}	
			})
			if (response.status === 200) {
				router.refresh();	
			}
		} catch (error) {
			console.error(error);
		}
	}


    return (
        <MdDeleteOutline className="comment-delete-btn" onClick={handleDelete}/>
    )
}
export default DeleteComment