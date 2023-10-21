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
    <div className="App">
          <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <button onClick={toggleMode}>Toggle Mode</button>
    </div>
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
