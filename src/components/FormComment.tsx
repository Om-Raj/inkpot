"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, FormEvent, useState } from "react"
import { MdSend } from "react-icons/md";

interface FormCommentProps {
    postId: string
}

const FormComment: FC<FormCommentProps> = ({postId}) => {
    const [comment, setComment] = useState<string>('');
    const router = useRouter();
    const { data } = useSession();
    const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }

    const handleSubmit = async (e: FormEvent) => {
        if (comment.trim() !== '') {
            try {
                const newComment = await axios.post('/api/comments', {
                    postId,
                    text: comment,
                })
                if (newComment.status === 200) {
                    router.refresh();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <div className="comment-form">
            <input type="text" name="comment" onChange={handleCommentChange} id="comment" placeholder="Write your thoughts..." value={comment}/>
            <button className={!data?.user?.email?"disabled":""} onClick={handleSubmit} disabled={!data?.user?.email}><center><MdSend /></center></button>
        </div>
    )
}
export default FormComment