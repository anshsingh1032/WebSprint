import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('Doubt');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // We use FormData because of the file upload
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('postType', postType);
    
    // Convert comma-separated tags into an array
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    tagsArray.forEach(tag => formData.append('tags[]', tag));
    
    if (file) formData.append('file', file);

    try {
      await axios.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Request posted successfully! 🚀');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text inline-block">
            Create a New Request
          </h2>
          <p className="text-gray-500 mt-2 font-medium">Ask a doubt or request study materials from the community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What do you need help with?"
                className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Type of Request</label>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium font-medium text-gray-700 cursor-pointer"
              >
                <option value="Doubt">🔴 Ask a Doubt</option>
                <option value="Notes">🔵 Request Notes</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="react, calculus, physics"
                className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
            <textarea
              required
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Explain your problem or specify what notes you need..."
              className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium resize-none"
            ></textarea>
          </div>

          {/* File Upload (Optional) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Attach a File (Optional)</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 transition-all cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-4 rounded-xl text-lg hover:shadow-[0_0_20px_rgba(167,139,250,0.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? 'Posting...' : 'Publish Request 🚀'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}