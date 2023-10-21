


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from '../Hooks/useAuthContext';
// import { useParams } from 'react-router-dom';

// const EditComment = () => {
//   const { user } = useAuthContext();
//   const { id } = useParams(); // Get the comment ID from the route parameters

//   const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
//   const [comments, setComments] = useState([]);
//   const [comment, setComment] = useState({ text: '', userId: user.idd, blogId: '' });

//   const fetchComment = async (commentId) => {
//     try {
//       const response = await axios.get(`/api/comment/${commentId}`);
//       setComment(response.data); // Set the comment data from the response
//     } catch (error) {
//       console.error('Error fetching comment', error);
//     }
//   };

//   const updateComment = async () => {
//     try {
//       await axios.put(`/api/comment/${id}`, comment); // Use the 'id' from the route parameter
//       // Handle the response or redirect as needed
//     } catch (error) {
//       console.error('Error updating comment', error);
//     }
//   };

//   useEffect(() => {
//     fetchComment(id); // Fetch the comment data based on the 'id' from the route parameter
//   }, [id]); // Add 'id' to the dependency array to re-fetch the comment when the 'id' changes

//   return (
//     <div>
//       <h2>Update Comment</h2>
//       <input
//         type="text"
//         placeholder="Text"
//         value={comment.text}
//         onChange={(e) => setComment({ ...comment, text: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="User ID"
//         value={comment.userId}
//         onChange={(e) => setComment({ ...comment, userId: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Blog ID"
//         value={comment.blogId}
//         onChange={(e) => setComment({ ...comment, blogId: e.target.value })}
//       />
//       <button onClick={updateComment}>Edit</button>
//     </div>
//   );
// };

// export default EditComment;

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
      
      // Assuming your server returns a success message or updated comment data
      // You can handle the response as needed (e.g., display a success message).
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

//   const updateComment = async () => {
//     try {
//       // Send a PUT request to update the comment
//       const response = await axios.put(`/api/comment/${id}`, {
//         text: comment.text,
//         user_id: user.idd,
//         blog_id: blog._id, // Set blogId to the value of blog._id
//       });
      
//       // Assuming your server returns a success message or updated comment data
//       // You can handle the response as needed (e.g., display a success message).
//       console.log('Comment updated:', response.data);
      
//       // Clear the text input after updating the comment
//       setComment({ ...comment, text: '' });
  
//       // Optionally, you can refetch the updated comment or its details here.
//     } catch (error) {
//       console.error('Error updating comment', error);
//       // Handle the error as needed in your component
//     }
//   };

  useEffect(() => {
    fetchComment(id);
  }, [id]);

  return (
    <div>
      <h2>Update Comment</h2>
      <input
        type="text"
        placeholder="Text"
        value={comment.text} // Display the comment text
        onChange={(e) => setComment({ ...comment, text: e.target.value })}
      />
      {/* <input
        type="text"
        placeholder="User ID"
        value={comment.userId}
      /> */}
      {/* <input
        type="text"
        placeholder="Blog ID"
        value={comment.blog_id} // Display the blog ID
      /> */}
      <button onClick={updateComment}>Edit</button>
    </div>
  );
};

export default EditComment;

