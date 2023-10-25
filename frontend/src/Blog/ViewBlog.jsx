import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Choose a Quill theme
import DeleteConfirmation from './DeleteConfirmation';
const ViewBlog = () => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({ text: '', userId: user.idd, blogId: '' }); // Initialize blogId here
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Control delete confirmation modal visibility
    const [CommentToDelete, setCommentToDelete] = useState(null); // Store the ID of the item to delete
    const [commentWithUsers, setCommentWithUsers] = useState([]);

    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blog/${id}`);
        setBlog(response.data);
        // Initialize comment.blogId with blog._id
        setComment({ ...comment, blogId: response.data._id });
      } catch (error) {
        console.error('Error fetching blog', error);
      }
    };

  const confirmDelete = (id) => {
    setCommentToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setCommentToDelete(null);
  };
const deleteComment = async () => {
    try {
      // Send a DELETE request to delete the comment
      const response = await axios.delete(`/api/comment/${CommentToDelete}`);
      if (response.status === 204) {
        // Successfully deleted the comment
        fetchComments(blog._id); // Refetch comments to update the list in real-time
        setShowDeleteConfirmation(false);
        setCommentToDelete(null); // Move these lines here
        return true;
      } else {
        // Handle other responses as needed
        console.error('Failed to delete comment:', response);
        return false;
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  };
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
      const response = await axios.post('/api/comment', {
        text: comment.text,
        user_id: user.idd,
        blog_id: blog._id, // Set blogId to the value of blog._id
      });
      const createdCommentId = response.data;
      console.log('Comment created with ID:', createdCommentId);
      setComment({ ...comment, text: '' });
        fetchComments(blog._id);
  
    } catch (error) {
      console.error('Error creating comment', error);
    }
  };
  function renderQuillContent(content) {
    return { __html: content };
  }
  useEffect(() => {
    fetchBlog();
    fetchComments(id);
  }, [id]);
  useEffect(() => {
    fetchComments(blog._id); 
  }, [blog._id]);
  const blogDateFormat = new Date(blog.createdAt);
  const BlogDate = blogDateFormat.toLocaleString();
  

  return (
    <div>

<div className="blog">
  {blog && (
    <div>
      <img
        style={{ objectFit: 'fill', height: 120, width: 180 }}
        src={`data:${blog.cover.contentType};base64,${blog.cover.data}`}
      />
      <p>Title: {blog.title}</p>
      <p>Content: {blog.content}</p>
      <p>Username: {blog.user ? blog.user.username : 'Unknown'}</p>
    </div>
  )}
</div>
        {/* <div className="blog">
        <div>
      {blog && (
        <div>
          <img
style={{ objectFit: 'fill', height: 120, width: 180 }}
src={`data:${blog.cover.contentType};base64,${blog.cover.data}`}
/>
          <p>Title: {blog.title}</p>
          <p>Content: {blog.content}</p>
          <p>Username: {author}</p>

        </div>
      )}
    </div>



            </div> */}



      <h2>Comment</h2>
      <input
        type="text"
        placeholder="Text"
        value={comment.text}
        onChange={(e) => setComment({ ...comment, text: e.target.value })}
      />
      <input
        type="hidden"
        placeholder="Blog ID"
        value={comment.blogId} // Display the blog ID in the input field
        disabled // Make it read-only
      />
      <input
        type="hidden"
        placeholder="User ID"
        value={comment.userId}
        disabled // Make it read-only
      />
      <button onClick={createComment}>Comment</button>





      <div className="comments">
        <h2>Comments:</h2>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.text}</p>

            <p>Created by: {comment.user_id.username}</p> {/* Accessing the user's username */}
            {comment.user_id === user.idd ? (
  <Link to={`/users/editcomment/${comment._id}`} className="btn btn-primary">
    edit
  </Link>
) : null}





            {comment.user_id === user.idd && (
            <button onClick={() => confirmDelete(comment._id)}>Delete</button>
          )}
            <p>{new Date(comment.createdAt).toLocaleString()}</p> {/* Convert to Date and format */}




          </div>

        ))}





      </div>

      <DeleteConfirmation
        showModal={showDeleteConfirmation}
        hideModal={cancelDelete}
        confirmModal={deleteComment}
        id={CommentToDelete}
        type="comment"
        message="Are you sure you want to delete this To Do?"
      />







    </div>

    




  );
};

export default ViewBlog;

