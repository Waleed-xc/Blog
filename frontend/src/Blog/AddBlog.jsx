
import axios from 'axios';
import React, { useState } from 'react';
import { useAuthContext } from "../Hooks/useAuthContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Choose a Quill theme

function AddBlog() {
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({ title: '', content: '', userId: user.idd });
  const [cover, setCover] = useState(null);

  const handleFileChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createBlog = async () => {
    try {
      const blogData = new FormData();
      blogData.append('title', formData.title);
      blogData.append('content', formData.content);
      blogData.append('userId', formData.userId);
      blogData.append('cover', cover);

      await axios.post('/api/blog', blogData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear form data
      setFormData({ title: '', content: '', userId: user.idd });
      setCover(null);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      />

      
<ReactQuill
  value={formData.content} 
  onChange={(content) => setFormData({ ...formData, content })} 
  theme="snow"
  placeholder="Content"
  modules={{
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
    ],
  }}
  formats={['bold', 'italic', 'underline', 'strike', 'list', 'link']}
/>
{/* 
      <input
        type="text"
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleInputChange}
      /> */}

      
      <input type="file" onChange={handleFileChange} />
      <button onClick={createBlog}>Create Blog</button>
    </div>
  );
}

export default AddBlog;



// import axios from 'axios';
//  import React, { useState, useEffect } from 'react';
// import { useAuthContext } from "../Hooks/useAuthContext";
// // import ReactQuill from 'react-quill';
// // import 'react-quill/dist/quill.snow.css'; // Choose a Quill theme
// function AddBlog() {
//   const {user} = useAuthContext()

//   const [formData, setFormData] = useState({ title: '', content: '', userId: user.idd, cover: null });

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, cover: e.target.files[0] });
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const createBlog = async () => {
//     try {
//       const blogData = new FormData();
//       blogData.append('title', formData.title);
//       blogData.append('content', formData.content);
//       blogData.append('userId', formData.userId);
//       blogData.append('cover', formData.cover);

//       await axios.post('/api/blog', blogData);

//       // Clear form data
//       setFormData({ title: '', content: '', userId: user.idd, cover: null });
//     } catch (error) {
//       console.error('Error creating blog:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Blog</h2>
//       <input
//         type="text"
//         name="title"
//         placeholder="Title"
//         value={formData.title}
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="content"
//         placeholder="Content"
//         value={formData.content}
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="userId"
//         placeholder="User ID"
//         value={formData.userId}
//         onChange={handleInputChange}
//       />
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={createBlog}>Create Blog</button>
//     </div>
//   );
// }

// export default AddBlog;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from "../Hooks/useAuthContext";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Choose a Quill theme

// const AddBlog = () => {
//     const {user} = useAuthContext()
//   const [blogs, setBlogs] = useState([]);
//   const [blog, setBlog] = useState({ title: '', content: '', userId: user.idd, cover: '' });
//   const [image, setImage] = useState(null);


//   const createBlog = async () => {
//     try {
//       await axios.post('/api/blog', blog);
//       setBlog({ title: '', content: '', userId: user.idd, cover: image });
//       window.location.href = "/users/userhome";
//     } catch (error) {
//       console.error('Error creating blog', error);
//     }
//   };
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };


//   return (
//     <div>
//       <h2>Create Blog</h2>
      
// <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{justifyContent: 'center' , alignItems: 'center' }} >
// {user && (
//             <div>

//         	 <span >  {user.email}</span> 
//            &nbsp;
//             </div>
//           )}
//           &nbsp; &nbsp;



//           </nav>


//       <input
//         type="text"
//         placeholder="Title"
//         value={blog.title}
//         onChange={(e) => setBlog({ ...blog, title: e.target.value })}
//       />

// <ReactQuill
//   value={blog.content}
//   onChange={(content) => setBlog({ ...blog, content })}
//   theme="snow" // Choose a Quill theme
//   placeholder="Content"
//   modules={{
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['link'],
//     ],
//   }}
//   formats={['bold', 'italic', 'underline', 'strike', 'list', 'link']}
// />

//       <input
//         type="hidden"
//         placeholder="User ID"
//         value={user.idd}
//       />


// <label htmlFor="image">Image:</label>
//         <input type="file" id="image" name="image" onChange={handleImageChange} required /><br />
   

//       <button onClick={createBlog}>Create</button>

//     </div>
//   );
// };

// export default AddBlog;
