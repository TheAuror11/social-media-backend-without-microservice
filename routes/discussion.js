const express = require("express")

const multer = require("multer");
const path = require("path");

const {
    // handleCreateDiscussion,
    handleDeleteDiscussion,
    handleGetDiscussionByTag,
    handleGetDiscussionByText,
    handleUpdateDiscussion,
    handleLikeDiscussion,
    handleViewsDiscussion,
  } = require("../controllers/discussion");
const { 
    handleAddComments, 
    handleLikeComments, 
    handleUpdateComments,
    handleDeleteComments
} = require("../controllers/comment");

const Post = require("../models/discussion");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', upload.single("image"), async(req,res) => {
    const { text, hashtags, user } = req.body;
    try {
        const discussion = new Post({ text, 
            image: `/uploads/${req.file.filename}`, 
            hashtags, 
            user });
        await discussion.save();
        res.status(201).json({ message: 'Discussion created successfully' });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});
router.put('/:id', handleUpdateDiscussion);
router.delete('/:id',handleDeleteDiscussion );
router.get('/tags', handleGetDiscussionByTag);
router.get('/text', handleGetDiscussionByText);
router.post('/like', handleLikeDiscussion);
router.post('/comment', handleAddComments);
router.post('/comment/like', handleLikeComments);
router.put('/comment/:id', handleUpdateComments);
router.delete('/comment/:id', handleDeleteComments);
router.get('/:id/view', handleViewsDiscussion);

module.exports = router;