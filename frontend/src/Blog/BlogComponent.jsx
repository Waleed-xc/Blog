import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../Hooks/useAuthContext";
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../Blog/DeleteConfirmation';
const BlogComponent = () => {
  const { user } = useAuthContext();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
  const [blogToDelete, setBlogToDelete] = useState(null); 

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
            {b.user.username}
            <button className="btn btn-danger" onClick={() => confirmDelete(b._id)}>Delete</button>
            <Link to={`/users/editblog/${b._id}`} className="btn btn-warning">
              Edit
            </Link>
            <Link to={`/users/viewblog/${b._id}`} className="btn btn-primary">
              View
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
