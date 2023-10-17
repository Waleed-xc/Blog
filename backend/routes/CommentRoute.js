const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// Create a new comment
router.post('/', CommentController.createComment);

// Get all comments for a specific blog
router.get('/blog/:blogId', CommentController.getCommentsByBlogId);

// Get a single comment by ID
router.get('/:id', CommentController.getCommentById);

// Update a comment by ID
router.put('/:id', CommentController.updateComment);

// Delete a comment by ID
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
