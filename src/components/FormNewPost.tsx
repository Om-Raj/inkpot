'use client'
import axios from "axios";
import "./styles/form-post.css"
import { FormData } from '@/types/blogs';
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState  } from 'react';
import TextareaAutosize from 'react-textarea-autosize'
import { useRouter } from "next/navigation";

const FormNewPost = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: ''
    });
    const {data} = useSession();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/posts', formData);
            if (response.status === 200) {
                router.push(`/blogs/${response.data.newPost.id}`)
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
            <h1 className='form-title'>New Blog</h1>
            <input 
                type="text" 
                name="title" 
                id="title" 
                placeholder="Title" 
                value={formData.title} 
                onChange={handleChange}
                required
            />
            <TextareaAutosize 
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
                    className={!data?.user?.email?"disabled":""}
                    type="submit" 
                    value="Submit"
                    disabled={!data?.user?.email} 
                />
            </div>
        </form>
    )
}
export default FormNewPost