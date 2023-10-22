const Blog = require('../models/BlogModel');
const multer = require("multer");
const fs = require("fs");

// Create multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create a multer instance
const upload = multer({ storage: storage }).single("cover");


// Create a new blog
const createBlog = (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: "Image upload error" });
    } else if (err) {
      return res.status(500).json({ error: "Unknown error occurred" });
    }

    try {
      const { title, content, userId } = req.body;

      const blog = new Blog({ 
        title,
        content,
        user: userId,
      });

      if (req.file) {
        blog.cover = {
          data: fs.readFileSync(req.file.path),
          contentType: req.file.mimetype,
        };
      }

      await blog.save();
      res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};



const updateBlog = (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: "Image upload error" });
    } else if (err) {
      return res.status(500).json({ error: "Unknown error occurred" });
    }

    try {
      const { title, content } = req.body;
      const updatedBlog = {
        title,
        content,
      };

      if (req.file) {
        updatedBlog.cover = {
          data: fs.readFileSync(req.file.path),
          contentType: req.file.mimetype,
        };
      }

      const updatedBlogDocument = await Blog.findByIdAndUpdate(
        req.params.id,
        updatedBlog,
        { new: true }
      );

      if (!updatedBlogDocument) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      res.status(200).json(updatedBlogDocument);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};


const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const blogsWithImages = blogs.map((blog) => {
      return {
        ...blog._doc,
        cover: {
          data: blog.cover.data.toString("base64"),
          contentType: blog.cover.contentType,
        },
      };
    });
    res.status(200).json(blogsWithImages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const blogWithImage = {
      ...blog._doc,
      cover: {
        data: blog.cover.data.toString("base64"),
        contentType: blog.cover.contentType,
      },
    };

    res.status(200).json(blogWithImage);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// // Get a single blog by ID
// const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Rest of the code for getting, deleting, and listing blogs remains the same.

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
