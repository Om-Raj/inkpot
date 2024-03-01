"use client"
import { ChangeEvent, FC, FormEvent, useState } from "react";
import "./styles/form-post.css"
import { FormData } from "@/types/blogs";
import axios from "axios";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";

interface FormEditPostProps {
    id: string,
    title: string,
    content: string,
    authorEmail: string | null
}

const FormEditPost: FC<FormEditPostProps> = ({id, title, content, authorEmail}) => {
    const [formData, setFormData] = useState<FormData>({
        title,
        content
    });
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
		try {
			const response = await axios.patch('/api/posts', {
                id,
                title: formData.title,
                content: formData.content,
                authorEmail
			})
			if (response.status === 200) {
				router.push(`/blogs/${id}`);	
			}
		} catch (error) {
			console.error(error);
		}
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    } 
    return (
        <form className="form-post" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                id="title" 
                placeholder="Title" 
                value={formData.title} 
                onChange={handleChange}
                required
            />
            <ReactTextareaAutosize 
                minRows={8} 
                id="content" 
                name="content" 
                placeholder='Write your thoughts...' 
                value={formData.content} 
                onChange={handleChange}
                required
            />
            <div className='btn-pair'>
                <input 
                    type="button" 
                    value="Clear"
                    onClick={() => setFormData({title: '', content: ''})}
                />
                <input 
                    type="submit" 
                    value="Submit"
                />
            </div>
        </form>
    )
}
export default FormEditPost