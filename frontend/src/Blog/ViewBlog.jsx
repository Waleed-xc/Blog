import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';

const ViewBlog = () => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({ text: '', userId: user.idd, blogId: '' }); // Initialize blogId here
    const [selectedBlogId, setSelectedBlogId] = useState('');
  
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
      // Send a POST request to create a comment
      const response = await axios.post('/api/comment', {
        text: comment.text,
        user_id: user.idd,
        blog_id: blog._id, // Set blogId to the value of blog._id
      });
      // Assuming your server returns the newly created comment's ID
      const createdCommentId = response.data;
      console.log('Comment created with ID:', createdCommentId);
      // Clear the text input after creating a comment
      setComment({ ...comment, text: '' });
  
      // Refetch comments to display in real-time
      fetchComments(blog._id);
  
    } catch (error) {
      console.error('Error creating comment', error);
      // Handle the error as needed in your component
    }
  };
  const deleteComment = async (id) => {
    try {
      // Send a DELETE request to delete the comment
      const response = await axios.delete(`/api/comment/${id}`);
      
      if (response.status === 204) {
        // Successfully deleted the comment
        fetchComments(blog._id); // Refetch comments to update the list in real-time
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




// const deleteComment = async (id) => {
//     try {
//       // Send a DELETE request to delete the comment
//       const response = await axios.delete(`/api/comment/${id}`);
      
//       if (response.status === 204) {
//         return true;
//         fetchComments(blog._id);

//       } else {
//         // Handle other responses as needed
//         console.error('Failed to delete comment:', response);
//         return false;
//       }

    
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//       return false;
//     }
//   };
  
  useEffect(() => {
    fetchBlog();
    fetchComments(id);
  }, [id]);

  useEffect(() => {
    fetchComments(blog._id); // Fetch comments when blog._id changes
  }, [blog._id]);

//   useEffect(() => {
//     fetchBlog();
//     fetchComments(id);
//   }, [id]);



  const blogDateFormat = new Date(blog.createdAt);
  const BlogDate = blogDateFormat.toLocaleString();

  return (
    <div>

        <div className="blog">
            Blog Post Cover: {blog.cover}
            <br />
            Blog Title {blog.title}
            <br />
            Blog Content {blog.content}
            <br />

            Blog Created At {BlogDate}
            <br />
            Author {user.usernameee}
            <br />

            </div>





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
            <p>{new Date(comment.createdAt).toLocaleString()}</p> {/* Convert to Date and format */}

            {comment.user_id === user.idd && (
            <button onClick={() => deleteComment(comment._id)}>Delete</button>
          )}
          </div>

        ))}

      </div>







    </div>

    




  );
};

export default ViewBlog;

