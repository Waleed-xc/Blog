const Comment = require('../models/CommentModel');

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { text, user_id, blog_id } = req.body;
    const comment = new Comment({ text, user_id, blog_id });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all comments for a specific blog
const getCommentsByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blog_id: blogId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single comment by ID
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a comment by ID
const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndRemove(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createComment,
  getCommentsByBlogId,
  getCommentById,
  updateComment,
  deleteComment,
};
