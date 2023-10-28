
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditComment = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ text: '', userId: user.idd, blog_id: '' });

  const fetchComment = async (commentId) => {
    try {
      const response = await axios.get(`/api/comment/${commentId}`);
      setComment(response.data); // Set the comment data from the response
    } catch (error) {
      console.error('Error fetching comment', error);
    }
  };
  
const updateComment = async () => {
  
    try {
      // Send a PUT request to update the comment
      const response = await axios.put(`/api/comment/${id}`, {
        text: comment.text,
        user_id: user.idd,
        blog_id: blog._id, // Set blogId to the value of blog._id
      });

      console.log('Comment updated:', response.data);
      
      // Clear the text input after updating the comment
      setComment({ ...comment, text: '' });
  
      // Use navigate to go back to the previous page
      navigate(-1); // This will navigate back one step in the history
  
    } catch (error) {
      console.error('Error updating comment', error);
      // Handle the error as needed in your component, e.g., show an error message.
    }
  };


  useEffect(() => {
    fetchComment(id);
  }, [id]);
  return (
    <div  style={{height: "100vh"}}>
      <br />
      <h2 className='mb-4'>Update Comment</h2>
      <div className='d-flex justify-content-center' >
      <input
      className='form-control mt=5 mb-3 w-75  '
        type="text"
        placeholder="Edit Your Comment Here"
        value={comment.text} // Display the comment text
        onChange={(e) => setComment({ ...comment, text: e.target.value })}
      />
      </div>
      <button className='btn btn-secondary' onClick={updateComment}>Edit</button>
    </div>
  );
};

export default EditComment;

