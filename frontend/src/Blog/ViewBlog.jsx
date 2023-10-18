

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';

const ViewBlog = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
  const [loading, setLoading] = useState(true);

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



  return (
    <div>
    

        <div>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>

        <div className="comments">
            comments logic here
        </div>

      
    </div>
  );
};

export default ViewBlog;
