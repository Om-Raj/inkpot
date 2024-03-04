"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { MdDeleteOutline } from "react-icons/md"

interface DeletePostProps {
    id: string,
    authorEmail: string,
}

const DeletePost: FC<DeletePostProps> = ({id, authorEmail}) => {
    const router = useRouter();
    const handleDelete = async() => {
        try {
            const response = await axios.delete("/api/posts/", {
                data: {
                    id,
                    authorEmail
                }
            })
            if (response.status === 200) {
                router.push("/blogs")
                router.refresh();
            }
        } catch(error){
            console.error(error)
        }
    }
    return (
        <MdDeleteOutline className="post-delete-button" onClick={handleDelete} />
    )
}
export default DeletePost