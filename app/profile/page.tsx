'use client';

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

interface DecodedUser {
    user_id: number;
    username: string;
  }

const Profile = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<DecodedUser | null>(null);
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        const u = getLoggedInUser();
        const t = getToken();
        if(u)
        setUser(u);
        setToken(t);
    }, []);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/posts/user/${user?.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `JWT ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user posts');
                }

                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUserPosts();
        }
    }, [user, token]);

    const handleDeletePost = async (postId: number) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `JWT ${token}`,
                },
            });

            if (response.ok) {
                // Remove the post from UI
                setPosts((prev) => prev.filter((p) => p.post_id !== postId));
            } else {
                console.error('Failed to delete post');
            }
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    return (
        <ProtectedRoute>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4 text-center">My Posts</h1>
                {loading ? (
                    <p>Loading your posts...</p>
                ) : posts.length === 0 ? (
                    <p>You have not posted anything yet.</p>
                ) : (
                    <div className="w-full md:w-[70%] mx-auto space-y-4">
                        {posts.map((post) => (
                            <div key={post.post_id} className="p-4 border rounded-lg shadow-sm bg-white relative">
                                <p className="mb-2">{post.content}</p>
                                <LikeButton postId={post.post_id} />
                                <CommentsSection postId={post.post_id} />
                                <span className="text-sm text-gray-500 block mt-2">
                                    Posted on {new Date(post.created_at).toLocaleString()}
                                </span>
                                <button
                                    onClick={() => handleDeletePost(post.post_id)}
                                    className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
                                >
                                    Delete Post
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
};

export default Profile;
