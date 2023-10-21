
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Choose a Quill theme
const EditBlog = () => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
  
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog', error);
      }
    };
  
    useEffect(() => {
      fetchBlog();
    }, [id]);
  
    const handleUpdate = async () => {
      try {
        await axios.put(`/api/blog/${id}`, blog);
        console.log('Blog updated successfully');
        // You can redirect to the blog list or another page after updating.
      } catch (error) {
        console.error('Error updating blog', error);
      }
    };
  
    return (
      <div>
        <h2>Edit Blog</h2>
        <p>Editing Blog ID: {id}</p>
        <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            />
          </div>
          <div>
            <label>Content:</label>
            <ReactQuill
              value={blog.content}
              onChange={(content) => setBlog({ ...blog, content })}
              theme="snow" // Choose a Quill theme
            />
          </div>
          <div>
            <label>Cover:</label>
            <input
              type="text"
              value={blog.cover}
              onChange={(e) => setBlog({ ...blog, cover: e.target.value })}
            />
          </div>
          <button type="button" onClick={handleUpdate}>
            Update Blog
          </button>
        </form>
      </div>
    );
  };
  
  export default EditBlog;

// const EditBlog = () => {
//   const { user } = useAuthContext();
//   const { id } = useParams();
//   const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });

//   const fetchBlog = async () => {
//     try {
//       const response = await axios.get(`/api/blog/${id}`);
//       setBlog(response.data);
//     } catch (error) {
//       console.error('Error fetching blog', error);
//     }
//   };

//   useEffect(() => {
//     fetchBlog();
//   }, [id]);

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`/api/blog/${id}`, blog);
//       console.log('Blog updated successfully');
//       // You can redirect to the blog list or another page after updating.
//     } catch (error) {
//       console.error('Error updating blog', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Blog</h2>
//       <p>Editing Blog ID: {id}</p>
//       <form>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={blog.title}
//             onChange={(e) => setBlog({ ...blog, title: e.target.value })}
//           />
//         </div>
//         <div>
//           <label>Content:</label>
//           <textarea
//             value={blog.content}
//             onChange={(e) => setBlog({ ...blog, content: e.target.value })}
//           />
//         </div>
//         <div>
//           <label>Cover:</label>
//           <input
//             type="text"
//             value={blog.cover}
//             onChange={(e) => setBlog({ ...blog, cover: e.target.value })}
//           />
//         </div>
//         <button type="button" onClick={handleUpdate}>
//           Update Blog
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBlog;
