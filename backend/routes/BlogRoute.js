const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController');

// Create a new blog
router.post('/', BlogController.createBlog);

// Get all blogs
router.get('/', BlogController.getAllBlogs);

// Get a single blog by ID
router.get('/:id', BlogController.getBlogById);

// Update a blog by ID
router.put('/:id', BlogController.updateBlog);

// Delete a blog by ID
router.delete('/:id', BlogController.deleteBlog);

module.exports = router;
