'use client';

import { useState } from 'react';
import { getLoggedInUser, getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

type Props = {
    onPostCreated?: () => void;  // optional callback to refresh posts
};

const PostForm = ({ onPostCreated }: Props) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const user = getLoggedInUser();
    const token = getToken();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

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

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const data = await response.json();
            console.log('Post created:', data);

            setContent('');

            // If a callback is provided (like in Profile page), refresh posts
            if (onPostCreated) {
                onPostCreated();
            } else {
                // default: navigate to home if no callback
                router.push('/home');
            }
        } catch (err) {
            console.error('Error creating post:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border rounded p-2"
                rows={4}
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? 'Posting...' : 'Post'}
            </button>
        </form>
    );
};

export default PostForm;
