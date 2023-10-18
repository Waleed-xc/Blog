import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../Hooks/useAuthContext";

const AddBlog = () => {
    const {user} = useAuthContext()
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });


  const createBlog = async () => {
    try {
      await axios.post('/api/blog', blog);
      setBlog({ title: '', content: '', userId: user.idd, cover: '' });
      window.location.href = "/users/userhome";
    } catch (error) {
      console.error('Error creating blog', error);
    }
  };


  return (
    <div>
      <h2>Create Blog</h2>
      
<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{justifyContent: 'center' , alignItems: 'center' }} >
{user && (
            <div>

        	 <span >  {user.email}</span> 
           &nbsp;
            </div>
          )}
          &nbsp; &nbsp;



          </nav>
      <input
        type="text"
        placeholder="Title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Content"
        value={blog.content}
        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
      />
      <input
        type="text"
        placeholder="User ID"
        value={user.idd}
      />
      <input
        type="text"
        placeholder="Cover"
        value={blog.cover}
        onChange={(e) => setBlog({ ...blog, cover: e.target.value })}
      />
      <button onClick={createBlog}>Create</button>

    </div>
  );
};

export default AddBlog;
