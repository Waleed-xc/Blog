// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from "../Hooks/useAuthContext";

// const EditBlog = () => {
//     const {user} = useAuthContext()
//   const [blogs, setBlogs] = useState([]);
//   const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });


//   const updateBlog = async (id) => {
//     try {
//       await axios.put(`/api/blog/${id}`, blog);
//       setBlog({  title: '', content: '', userId: user.idd, cover: '' });
//     } catch (error) {
//       console.error('Error updating blog', error);
//     }
//   };




//   return (
//     <div>
//       <h2>Update Blog</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={blog.title}
//         onChange={(e) => setBlog({ ...blog, title: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Content"
//         value={blog.content}
//         onChange={(e) => setBlog({ ...blog, content: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="User ID"
//         value={user.idd}
//       />
//       <input
//         type="text"
//         placeholder="Cover"
//         value={blog.cover}
//         onChange={(e) => setBlog({ ...blog, cover: e.target.value })}
//       />


//       <button onClick={updateBlog}>Update</button>

//       <h2>Blogs</h2>
//       <ul>
//         {blogs.map((b) => (
//           <li key={b._id}>
//             {b.title}
//             <button onClick={() => updateBlog(b._id)}>Update</button>

//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default EditBlog;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';

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
          <textarea
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
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
