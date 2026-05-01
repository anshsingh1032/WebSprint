const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    postType: {
    type: String,
    enum: ['Doubt', 'DailyTask', 'NoteRequest'],
    required: true
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String }],
    fileUrl: { type: String },
    status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Resolved'],
    default: 'Pending'
    },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });
module.exports = mongoose.model('Post', postSchema);
