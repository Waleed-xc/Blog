
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../Hooks/useAuthContext";
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../Blog/DeleteConfirmation';
 import { useUserLogout } from '../Hooks/useUserLogout';
 import { PenIcon , TrashIcon, AddIcon , BackIcon , EyeIcon } from '../Users/Icons'; // Import the PenIcon from your Icon component
const UserHome = () => {
  const { user } = useAuthContext();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Control delete confirmation modal visibility
  const [blogToDelete, setBlogToDelete] = useState(null); // Store the ID of the item to delete
   const { userlogout } = useUserLogout();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  };

     const handleClick = () => {
     userlogout();
     window.location.href = "/";
  }


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
    <div className='user' style={{height: "150vh"}}  >

       <nav className="navbar navbar navbar-light" style={{justifyContent: 'center' , alignItems: 'center' }} > {user && (
             <div>
                             <button class="btn btn-secondary " onClick={handleClick}>  <BackIcon/>  Log out</button>

         	 <span >  {user.email}</span> 
            &nbsp;
             </div>
           )}
           &nbsp; &nbsp;



           </nav>
           <div class="container  p-1 my-3 border">

<div class="d-flex bd-highlight mb-4">
      <h2 className='p-2 w-100 bd-highlight'>Blogs</h2>
      <br />
      <Link to="/users/addblog"  className="p-2 flex-shrink-0 bd-highlight btn btn-success mb-3 end-0" >
       Add <AddIcon/> 
</Link>
<br />
</div>
</div>

<div class="container  p-1 my-3 border">
<ul class="list-group ">
  {blogs.map((blog) => (
    <li class="list-group-item list-group-item-light" key={blog._id}>

<h5 className='mx-1'> Blog Author: {blog.user.username}</h5>

 <small className='opacity-75' > Created At: {new Date(blog.createdAt).toLocaleString()} </small>

<br />
<div class="container-fluid no-padding">
      <img
      className='img-fluid w-25'
        // style={{ objectFit: 'fill', height: 220, width: 280 }}
        src={`data:${blog.cover.contentType};base64,${blog.cover.data}`}
        alt={blog.title}
      />
      <br />
      </div>


<Link to={`/users/viewblog/${blog._id}`} className="btn btn-secondary my-1 mx-1">
<EyeIcon/>            {blog.title}  
            </Link>


      {user.idd === blog.user._id && (

        <>
                  <Link to={`/users/editblog/${blog._id}`} className="btn btn-warning  my-1 mx-1">
          <PenIcon/>  Edit Post
          </Link>
          <button className="btn btn-danger my-1 mx-1 " onClick={() => confirmDelete(blog._id)}>
          <TrashIcon/> Delete Post
          </button>


        </>
      )}
    </li>
  ))}
</ul>
</div>



      <DeleteConfirmation
        showModal={showDeleteConfirmation}
        hideModal={cancelDelete}
        confirmModal={executeDelete}
        id={blogToDelete}
        type="blog"
        message="Are you sure you want to delete this Blog?"
      />
    </div>
  );
};

export default UserHome;