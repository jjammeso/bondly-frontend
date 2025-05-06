'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, getToken } from '@/lib/auth';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const router = useRouter();

    const user = getLoggedInUser();
    const token = getToken();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(user){
            try {
                const response = await fetch('http://localhost:5000/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `JWT ${token}`
                    },
                    body: JSON.stringify({ 
                        content,
                        user_id: user?.user_id,
                    }),
                });
    
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to create post');
                }
    
               router.push('/home');
            } catch (err) {
                console.error('Error creating post:', err);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Create Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    placeholder="Type here"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="input"
                    rows={4}
                    required
                />
                <button type="submit" className="btn">
                    Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
