'use client'

import { useState, useEffect } from 'react';
import CommentsSection from '@/components/CommentsSection';
import LikeButton from '@/components/LikeButton';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getLoggedInUser, getToken } from '@/lib/auth';

interface Post {
    post_id: number;
    content: string;
    username: string;
    created_at: string;
  }

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [content, setContent] = useState('');

    const user = getLoggedInUser();
    const token = getToken();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
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

            await fetchPosts();
        } catch (err) {
            console.error('Error creating post:', err);
        }
    };

        const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `JWT ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
            }
        };

        useEffect(() => {
            if (token) fetchPosts();
        }, []);

    return (
        <ProtectedRoute>
            <div className="container mx-auto px-4 py-6 flex flex-col items-center">
                <div className="w-full md:w-[70%] bg-white rounded-lg shadow-md p-6 mb-8">
                    <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Create a New Post</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            placeholder="Type here"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={4}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                            Post
                        </button>
                    </form>
                </div>

                <div className="w-full md:w-[70%]">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Posts</h2>
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div key={post.post_id} className="p-4 border rounded-lg shadow-sm bg-white">
                                <p className="mb-2 text-gray-700">{post.content}</p>
                                <LikeButton postId={post.post_id} />
                                <CommentsSection postId={post.post_id} />
                                <span className="text-sm text-gray-500 block mt-2">
                                    Posted by {post.username}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Home;
