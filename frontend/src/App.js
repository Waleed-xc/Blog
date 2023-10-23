import './App.css';
import React from "react";
import { useAuthContext } from "./Hooks/useAuthContext";
import { BrowserRouter as Router, Route, Routes  ,Navigate } from "react-router-dom";
import UserSignup from './Users/UserSignup';
import UserLogin from './Users/UserLogin';
import UserHome from './Users/UserHome';
import BlogComponent from './Blog/BlogComponent';
import CommentComponent from './Comment/CommentComponent';
import AddBlog from './Blog/AddBlog';
import EditBlog from './Blog/EditBlog';
import ViewBlog from './Blog/ViewBlog';
import EditComment from './Blog/EditComment';
import { AuthContextProvider } from './Context/AuthContext'
import  { useState } from 'react';
function App() {
  const {user} = useAuthContext()
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (


<div className={`App ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
  <button   className={` btn ${isDarkMode ? 'bg-light text-dark' : 'bg-dark text-light'} position-absolute bottom-0 start-0 mt-3 mx-3 rounded-circle  `}
 onClick={toggleMode}>
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
      
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
    
            </svg>
          )}
        </button>


  
          <AuthContextProvider>

	<Router>
				<Routes>
        <Route exact path="/" element={!user? <UserSignup />:<Navigate to="/users/userhome"/> }/>
        <Route exact path="/users/userhome" element={user?<UserHome />:<Navigate to="/"/>}/>  
        <Route exact path="/login" element={!user? <UserLogin />:<Navigate to="/users/userhome"/>  }/>
        <Route exact path="/users/blog" element={<BlogComponent /> }/>
        <Route exact path="/users/addblog" element={<AddBlog /> }/>
        <Route exact path="/users/editblog/:id" element={<EditBlog /> }/>
        <Route exact path="/users/viewblog/:id" element={<ViewBlog /> }/>
        <Route exact path="/users/comment/" element={<CommentComponent /> }/>
        <Route exact path="/users/editcomment/:id" element={<EditComment /> }/>
				</Routes>
			</Router>

      </AuthContextProvider>



    </div>

  );
}
export default App;
