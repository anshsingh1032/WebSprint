const express = require('express');
const router = express.Router();
const { createPost, getPosts, getSinglePost, addReply,acceptRequest } =
require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
.get(getPosts)
.post(protect, upload.single('file'), createPost);

router.route('/:id')
.get(getSinglePost);

router.route('/:id/replies')
.post(protect, upload.single('file'), addReply);

router.route('/:id/accept')
.put(protect, acceptRequest);

module.exports = router;
