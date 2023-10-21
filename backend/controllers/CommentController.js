const Comment = require('../models/CommentModel');

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { text, user_id, blog_id } = req.body;
    const comment = new Comment({ text, user_id, blog_id });
    const com = comment._id;
    await comment.save();
    res.status(201).json( com );
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error',  });
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

const deleteComment = async (req, res) => {
    try {
      // Find the comment by ID
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      // Check if the authenticated user owns the comment
    //   if (comment.user_id.toString() !== req.user.id) {
    //     return res.status(403).json({ error: "You don't have permission to delete this comment" });
    //   }
      const deletedComment = await Comment.findByIdAndRemove(req.params.id);
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
