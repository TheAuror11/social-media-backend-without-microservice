const Comment = require('../models/comment');
const Post = require('../models/discussion');

async function handleAddComments (req,res) {
    const { discussion, text, user } = req.body;
    try {
      const comments = new Comment({ text, user, discussion: discussion });
      await comments.save();
      const discussions = await Post.findById(discussion);
      discussions.comments.push(comments._id);
      await discussions.save();
      res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
async function handleLikeComments (req,res) {
    const { comment, user } = req.body;
    try {
      const comments = await Comment.findById(comment);
      if (!comments) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      if (comments.likes.includes(user)) {
        return res.status(400).json({ error: 'Already liked this comment' });
      }
      comments.likes.push(user);
      await comments.save();
      res.json({ message: 'Comment liked successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

async function handleUpdateComments (req,res) {
    const { id } = req.params;
    const { text } = req.body;
    try {
      const comment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
      res.json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

async function handleDeleteComments (req,res) {
    const { id } = req.params;
    try {
      await Comment.findByIdAndDelete(id);
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};


module.exports = {
  handleAddComments,
  handleLikeComments,
  handleUpdateComments,
  handleDeleteComments,
  
}