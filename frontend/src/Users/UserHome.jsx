// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from "../Hooks/useAuthContext";
// import { Link } from 'react-router-dom';
// import { useUserLogout } from '../Hooks/useUserLogout';
// import DeleteConfirmation from './DeleteConfirmation'; // Import the DeleteConfirmation component
// import '../Users/style.css';
// import { PenIcon , TrashIcon, AddIcon , BackIcon } from '../Users/Icons'; // Import the PenIcon from your Icon component

// function UserHome() {

//   const { user } = useAuthContext();
//   const { userlogout } = useUserLogout();
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Control delete confirmation modal visibility

//   const handleClick = () => {
//     userlogout();
//     window.location.href = "/";
//   }


//   return (
//     <body className='bg-light bg-gradient' style={{height: "100vh"}} >
      

//     <div className='contrainer bg-light' >

// <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{justifyContent: 'center' , alignItems: 'center' }} >
// {user && (
//             <div>
//                             <button class="btn btn-dark" onClick={handleClick}>  <BackIcon/> Log out</button>

//         	 <span >  {user.email}</span> 
//            &nbsp;
//             </div>
//           )}
//           &nbsp; &nbsp;



//           </nav>
 
//       <div class="bg-light"  >
//     <div class="container">
//       <h1 class="display-3">Hello, Mr. {user.usernameee}!</h1>
//       <h3 class="display-5" >Here Are Your To Do List</h3>
//     </div>
// </div>
// <Link to="/users/addblog"  className="btn btn-primary" >

//       <AddIcon /> Add blog

// 						</Link>

//             <Link to="/users/blog"  className="btn btn-primary" >

//       <AddIcon /> view blog

// 						</Link>

//             <Link to="/users/editblog"  className="btn btn-primary" >

//       <AddIcon /> edit blog

// 						</Link>

//             <Link to="/users/comment"  className="btn btn-primary" >

// <AddIcon /> comment blog

//       </Link>


//             <br />
//             <br />





//           <div className=" table-responsive">
//           <table className="  table  table-dark table-hover table-striped container ">

//           <thead>
//     <tr>
//       <th>ToDo</th>
//       <th>Status</th>
//       <th>Edit</th>
//       <th>Delete</th>
//     </tr>
//   </thead>



//   <tbody>
        
  
//         </tbody>


// </table>

// </div>

// </div>


// <br />

// </body>



//   );
// }

// export default UserHome;

// UserHome.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../Hooks/useAuthContext";
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../Blog/DeleteConfirmation';
 import { useUserLogout } from '../Hooks/useUserLogout';
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
    <div className='user'>

       <nav className="navbar navbar navbar-light" style={{justifyContent: 'center' , alignItems: 'center' }} > {user && (
             <div>
                             <button class="btn btn-secondary " onClick={handleClick}>  Log out</button>

         	 <span >  {user.email}</span> 
            &nbsp;
             </div>
           )}
           &nbsp; &nbsp;



           </nav>


      <h2>Blogs</h2>
      <Link to="/users/addblog"  className="btn btn-primary" >

Add blog

</Link>


<ul>
  {blogs.map((blog) => (
    <li key={blog._id}>
      {blog.user.username}
      <img
        style={{ objectFit: 'fill', height: 120, width: 180 }}
        src={`data:${blog.cover.contentType};base64,${blog.cover.data}`}
        alt={blog.title}
      />

<Link to={`/users/viewblog/${blog._id}`} className="btn btn-primary">
              view
            </Link>


      {user.idd === blog.user._id && (
        <>
          <button className="btn btn-danger" onClick={() => confirmDelete(blog._id)}>
            Delete
          </button>
          <Link to={`/users/editblog/${blog._id}`} className="btn btn-warning">
            Edit
          </Link>
        </>
      )}
    </li>
  ))}
</ul>


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