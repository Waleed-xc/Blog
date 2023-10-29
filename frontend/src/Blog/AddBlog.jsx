
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
      window.location.href = "/users/userhome"
    
    
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div style={{height: "100vh"}}>
            <br />

      
      <h2>Add a New Blog</h2>
      <br />

      

<div className=' d-flex justify-content-center mt-4 mb-4'>
      <input
        className='form-control w-75 '
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      />
       </div>

       <br />

      

<ReactQuill
  value={formData.content} 
  onChange={(content) => setFormData({ ...formData, content })} 
  theme="snow"
  modules={{
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
    ],
  }}
  formats={['bold', 'italic', 'underline', 'strike', 'list', 'link']}
/>

<br />
      <br />
      <br />
      <br />
      <br />
            
      <input className='mt-4 mb-4' type="file" onChange={handleFileChange} />
      <br />
      <br />
      <br />
      <br />
      <br />
      

 <button className='btn btn-secondary  mb-5' onClick={createBlog}>Create Blog</button>  </div>
  );
}

export default AddBlog;



//       </div>
  
//       <div className='mt-4 mb-4 '>
//         <label>Content:</label>
//         <ReactQuill
//           value={blog.content}
//           onChange={(content) => setBlog({ ...blog, content })}
//           theme="snow"
//         />
//       </div>

//       <div className='mt-4 mb-4' > 
//         <label>Cover:</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setCoverFile(e.target.files[0])} // Set the selected file
//         />
//       </div>className='btn btn-secondary mt-5'
//       <button className='btn btn-secondary mt-5' type="button" onClick={handleUpdate}>
//         Update Blog
//       </button>
//     </form>
//   </div>
// );
// };

// export default EditBlog;
