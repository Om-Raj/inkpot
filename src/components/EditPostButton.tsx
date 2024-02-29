import Link from "next/link"
import { FC } from "react"
import { MdOutlineEdit } from "react-icons/md"

interface EditPostProps {
	id: string
}

const EditPost: FC<EditPostProps> = ({id}) => {
    return (
		<Link href={`/edit/${id}`}>
        	<MdOutlineEdit className="post-edit-button"/>
		</Link>
    )
}
export default EditPost