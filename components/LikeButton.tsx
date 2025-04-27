'use client';

import { useState, useEffect } from 'react';

type Props = {
  postId: number;
  userId?: number; // Default to 1 for now
};

const LikeButton = ({ postId, userId = 1 }: Props) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/likes/${postId}`);
        const data = await res.json();
        setLikeCount(data.likeCount);
        setLiked(data.userLiked); // `userLiked` from backend
      } catch (err) {
        console.error('Error fetching likes:', err);
      }
    };

    fetchLikes();
  }, [postId]);

  const handleLikeToggle = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      });

      if (res.ok) {
        const data = await res.json();
        setLiked(data.liked); // true or false
        setLikeCount(data.likeCount); // updated count
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  return (
    <div className="mt-2 flex items-center space-x-2">
      <button
        onClick={handleLikeToggle}
        className={`px-3 py-1 rounded text-white ${
          liked ? 'bg-red-500' : 'bg-gray-400'
        } hover:opacity-90`}
      >
        {liked ? 'Unlike' : 'Like'}
      </button>
      <span className="text-sm text-gray-600">{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
    </div>
  );
};

export default LikeButton;
