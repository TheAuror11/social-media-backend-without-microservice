const Post = require('../models/discussion');

async function handleUpdateDiscussion (req, res)  {
  const { id } = req.params;
  const { text, image, hashtags } = req.body;
  try {
    const discussion = await Post.findByIdAndUpdate(id, 
      { text, 
        image, 
        hashtags
      }, { new: true });
    res.json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function handleDeleteDiscussion (req, res)  {
  const { id } = req.params;
  try {
    await Discussion.findByIdAndDelete(id);
    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


async function handleGetDiscussionByTag (req, res)  {
  const { tag } = req.query;
  try {
    const discussions = await Post.find({ hashtags: tag });
    res.json(discussions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function handleGetDiscussionByText (req, res) {
  const { text } = req.query;
  try {
    const discussions = await Post.find({ text: new RegExp(text, 'i') });
    res.json(discussions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function handleLikeDiscussion (req,res) {
    const { discussion, user } = req.body;
    try {
      const discussions = await Post.findById(discussion);
      if (!discussions) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    if (discussions.likes.includes(user)) {
      return res.status(400).json({ error: 'Already liked this discussion' });
    }
    discussions.likes.push(user);
    await discussions.save(); 
    res.json({ message: 'Discussion liked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handleViewsDiscussion(req, res){
  const { id } = req.params;
  try {
    const discussion = await Post.findById(id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    discussion.viewCount += 1;
    await discussion.save();
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  handleDeleteDiscussion,
  handleGetDiscussionByTag,
  handleGetDiscussionByText,
  handleUpdateDiscussion,
  handleLikeDiscussion,
  handleViewsDiscussion,

}
