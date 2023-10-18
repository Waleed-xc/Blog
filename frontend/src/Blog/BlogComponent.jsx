// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from "../Hooks/useAuthContext";
// import { Link } from 'react-router-dom';

// const BlogComponent = () => {
//     const {user} = useAuthContext()
//   const [blogs, setBlogs] = useState([]);
//   const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
//   const fetchBlogs = async () => {
//     try {
//       const response = await axios.get('/api/blog');
//       setBlogs(response.data);
//     } catch (error) {
//       console.error('Error fetching blogs', error);
//     }
//   };


//   const viewBlog = async (id) => {
//     try {
//       const response = await axios.get(`/api/blog/${id}`);
//       // Handle the response as needed (e.g., display the blog's details).
//       console.log('Viewing blog:', response.data);
//     } catch (error) {
//       console.error('Error viewing blog', error);
//     }
//   };


//   const deleteBlog = async (id) => {
//     try {
//       await axios.delete(`/api/blog/${id}`);
//       fetchBlogs();
//     } catch (error) {
//       console.error('Error deleting blog', error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   return (
//     <div>
     
//       <h2>Blogs</h2>
//       <ul>
//         {blogs.map((b) => (
//           <li key={b._id}>
//             {b.title}
//             <button onClick={() => viewBlog(b._id)}>View</button>
//             <button onClick={() => deleteBlog(b._id)}>Delete</button>
//             <button>              <Link to={`/users/editblog/${b._id}`} className="btn btn-warning" >   </Link>  </button>
//           </li>


         
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BlogComponent;

// BlogComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../Hooks/useAuthContext";
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../Blog/DeleteConfirmation';

const BlogComponent = () => {
  const { user } = useAuthContext();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Control delete confirmation modal visibility
  const [blogToDelete, setBlogToDelete] = useState(null); // Store the ID of the item to delete

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  };

  const confirmDelete = (id) => {
    setBlogToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setBlogToDelete(null);
  };

  const executeDelete = async () => {
    try {
      await axios.delete(`/api/blog/${blogToDelete}`);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog', error);
    }
    setShowDeleteConfirmation(false);
    setBlogToDelete(null);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((b) => (
          <li key={b._id}>
            {b.title}
            <button className="btn btn-danger" onClick={() => confirmDelete(b._id)}>    Delete     </button>
            <Link to={`/users/editblog/${b._id}`} className="btn btn-warning">
              Edit
            </Link>

            <Link to={`/users/viewblog/${b._id}`} className="btn btn-primary">
              view
            </Link>

          </li>
        ))}
      </ul>

      <DeleteConfirmation
        showModal={showDeleteConfirmation}
        hideModal={cancelDelete}
        confirmModal={executeDelete}
        id={blogToDelete}
        type="blog"
        message="Are you sure you want to delete this To Do?"
      />
    </div>
  );
};

export default BlogComponent;
