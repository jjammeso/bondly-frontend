'use client';

import { getLoggedInUser } from '@/lib/auth';
import { useState, useEffect } from 'react';

type Comment = {
  comment_id: number;
  content: string;
  username: string;
  created_at: string;
};

type Props = {
  postId: number;
};

const CommentsSection = ({ postId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const user = getLoggedInUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/comments/${postId}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          user_id: user?.user_id,
          content: newComment,
        }),
      });

      if (res.ok) {
        const added = await res.json();
        setComments((prev) => [
          ...prev,
          {
            comment_id: added.commentId,
            content: newComment,
            username: user?.username || 'CurrentUser',
            created_at: new Date().toISOString(),
          },
        ]);
        setNewComment('');
      } else {
        console.error('Failed to add comment');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Comments ({comments.length})</h2>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="text-sm text-blue-500 hover:underline"
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>

      {showComments && (
        <div className="space-y-2 mt-2">
          {comments.map((c) => (
            <div key={c.comment_id} className="border p-2 rounded">
              <p className="text-sm">{c.content}</p>
              <span className="text-xs text-gray-500">
                {c.username} • {new Date(c.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3">
        <textarea
          className="w-full border rounded p-2"
          rows={2}
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
