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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const { data } = useSession();
    const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }
    console.log("========= Comments ==========")
    console.log(data);

    const handleSubmit = async (e: FormEvent) => {
        setIsLoading(true);
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
            } finally {
                setIsLoading(false);
            }
        }
    }
    return (
        <div className="comment-form">
            <input type="text" name="comment" onChange={handleCommentChange} id="comment" placeholder="Write your thoughts..." value={comment}/>
            <button className={!data?.user?.email || isLoading?"disabled":""} onClick={handleSubmit} disabled={!data?.user?.email || isLoading}><center><MdSend /></center></button>
        </div>
    )
}
export default FormComment