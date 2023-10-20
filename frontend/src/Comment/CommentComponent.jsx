import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../Hooks/useAuthContext";

const CommentComponent = () => {
  const { user } = useAuthContext();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ text: '',  userId: user.idd, blog_id: '' });
  const [selectedBlogId, setSelectedBlogId] = useState('');

  const fetchComments = async (blogId) => {
    try {
      const response = await axios.get(`/api/comment/${blogId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  };

  const createComment = async () => {
    try {
      comment.blog_id = selectedBlogId;
      await axios.post('/api/comments', comment);
      setComment({ text: '', userId: user.idd, blog_id: '' });
      fetchComments(selectedBlogId);
    } catch (error) {
      console.error('Error creating comment', error);
    }
  };

  const viewComment = async (id) => {
    try {
      const response = await axios.get(`/api/comment/${id}`);
      // Handle the response as needed (e.g., display the comment's details).
      console.log('Viewing comment:', response.data);
    } catch (error) {
      console.error('Error viewing comment', error);
    }
  };

  const updateComment = async (id) => {
    try {
      await axios.put(`/api/comments/${id}`, comment);
      setComment({ text: '',  userId: user.idd, blog_id: '' });
      fetchComments(selectedBlogId);
    } catch (error) {
      console.error('Error updating comment', error);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`/api/comments/${id}`);
      fetchComments(selectedBlogId);
    } catch (error) {
      console.error('Error deleting comment', error);
    }
  };

  const handleBlogSelection = (blogId) => {
    setSelectedBlogId(blogId);
    fetchComments(blogId);
  };

  useEffect(() => {
    // Fetch comments for the initial selected blog (if any).
    if (selectedBlogId) {
      fetchComments(selectedBlogId);
    }
  }, [selectedBlogId]);
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h2>Select a Blog</h2>
      <select onChange={(e) => handleBlogSelection(e.target.value)}>
        {/* Populate this select box with available blog options */}
        <option value="blog1">Blog 1</option>
        <option value="blog2">Blog 2</option>
        {/* Add more options as needed */}
      </select>

      <h2>Create Comment</h2>
      <input
        type="text"
        placeholder="Text"
        value={comment.text}
        onChange={(e) => setComment({ ...comment, text: e.target.value })}
      />
      <input
        type="text"
        placeholder="User ID"
        value={comment.userId}
        onChange={(e) => setComment({ ...comment, userId: e.target.value })}
      />
      <button onClick={createComment}>Create</button>

      <h2>Comments</h2>
      
      <ul>
        {comments.map((c) => (
          <li key={c._id}>
            {c.text}
            <button onClick={() => viewComment(c._id)}>View</button>
               <h1> {            viewComment(c._id)} </h1>            
<button onClick={() => updateComment(c._id)}>Update</button>
            <button onClick={() => deleteComment(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentComponent;
