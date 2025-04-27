'use client'

import { useState, useEffect } from 'react';
import CommentsSection from '@/components/CommentsSection';
import LikeButton from '@/components/LikeButton';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getToken } from '@/lib/auth';

const Home = () => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = getToken();

            try {
                // Fetch posts from the backend (replace with your actual API endpoint)
                const response = await fetch('http://localhost:5000/api/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
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
        fetchPosts();
    }, []);

    return (
        <ProtectedRoute>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Posts</h1>
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.post_id} className="p-4 border rounded-lg shadow-sm">
                            <p>{post.content}</p>
                            <LikeButton postId={post.post_id} />
                            <CommentsSection postId={post.post_id} />
                            <span className="text-sm text-gray-500">Posted by {post.username}</span>
                        </div>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Home;
