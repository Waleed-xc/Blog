import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../Hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { useUserLogout } from '../Hooks/useUserLogout';
import DeleteConfirmation from './DeleteConfirmation'; // Import the DeleteConfirmation component
import '../Users/style.css';
import { PenIcon , TrashIcon, AddIcon , BackIcon } from '../Users/Icons'; // Import the PenIcon from your Icon component

function UserHome() {

  const { user } = useAuthContext();
  const { userlogout } = useUserLogout();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Control delete confirmation modal visibility

  const handleClick = () => {
    userlogout();
    window.location.href = "/";
  }







  return (
    <body className='bg-light bg-gradient' style={{height: "100vh"}} >
      

    <div className='contrainer bg-light' >

<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{justifyContent: 'center' , alignItems: 'center' }} >
{user && (
            <div>
                            <button class="btn btn-dark" onClick={handleClick}>  <BackIcon/> Log out</button>

        	 <span >  {user.email}</span> 
           &nbsp;
            </div>
          )}
          &nbsp; &nbsp;



          </nav>
 
      <div class="bg-light"  >
    <div class="container">
      <h1 class="display-3">Hello, Mr. {user.usernameee}!</h1>
      <h3 class="display-5" >Here Are Your To Do List</h3>
    </div>
</div>
<Link to="/users/addblog"  className="btn btn-primary" >

      <AddIcon /> Add blog

						</Link>

            <Link to="/users/blog"  className="btn btn-primary" >

      <AddIcon /> view blog

						</Link>

            <Link to="/users/editblog"  className="btn btn-primary" >

      <AddIcon /> edit blog

						</Link>


            <br />
            <br />





          <div className=" table-responsive">
          <table className="  table  table-dark table-hover table-striped container ">

          <thead>
    <tr>
      <th>ToDo</th>
      <th>Status</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>



  <tbody>
        
  
        </tbody>


</table>

</div>

</div>


<br />

</body>



  );
}

export default UserHome;

