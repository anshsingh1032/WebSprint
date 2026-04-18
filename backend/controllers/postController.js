const Post  = require ("../models/Post")
const Reply = require("../models/Reply")
const User = require("../models/User")

const createPost = async (req, res) => {
    try {
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;


        let tagsArray = [];
        
        if (req.body['tags[]']) {

            tagsArray = Array.isArray(req.body['tags[]']) ? req.body['tags[]'] : [req.body['tags[]']];
        } 
        else if (Array.isArray(req.body.tags)) {

            tagsArray = req.body.tags;
        } 
        else if (typeof req.body.tags === 'string') {

            tagsArray = req.body.tags.split(',').map(tag => tag.trim());
        }


        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            postType: req.body.postType,
            tags: tagsArray, 
            fileUrl: fileUrl,
            author: req.user._id
        });
        
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const getPosts = async (req, res) => {
try {
const { postType, search } = req.query;
let filter = {};
if (postType) filter.postType = postType;


if (search) {
filter.tags = { $regex: search, $options: 'i' };
}
const posts = await Post.find(filter)
.populate('author', 'name email reputation')
.sort({ createdAt: -1 });
res.json(posts);
} catch (error) {
res.status(500).json({ message: error.message });
}
};
// GET /api/posts/:id
const getSinglePost = async (req, res) => {
try {
    
const post = await Post.findById(req.params.id).populate('author', 'name reputation');
if (!post) return res.status(404).json({ message: 'Post not found' });

const replies = await Reply.find({ post: req.params.id }).populate('author',
'name reputation');
res.json({ post, replies });
} catch (error) {
res.status(500).json({ message: error.message });
}
};
const acceptRequest = async (req, res) => {
try {
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ message: 'Post not found' });
if (post.status !== 'Pending') return res.status(400).json({ message: 'Request is already accepted or resolved' });

post.status = 'Accepted';
post.acceptedBy = req.user._id; 
await post.save();
await User.findByIdAndUpdate(req.user._id, { $inc: { reputation: 10 } });
res.json(post);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

const addReply = async (req, res) => {
try {
const fileUrl = req.file ? `/uploads/${req.file.filename}`
: null;
const reply = await Reply.create({
text: req.body.text,
post: req.params.id,
author: req.user._id,
fileUrl: fileUrl
});

await Post.findByIdAndUpdate(req.params.id, { status: 'Resolved' });
await User.findByIdAndUpdate(req.user._id, { $inc: { reputation: 5 } });
// ------------------------
res.status(201).json(reply);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

module.exports = {
  createPost,
  getPosts,       
  getSinglePost,
  addReply,
  acceptRequest
};
