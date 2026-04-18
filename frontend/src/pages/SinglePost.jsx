import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function SinglePost() {
  const { id } = useParams();
  const [data, setData] = useState({ post: null, replies: [] });
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostData();
  }, [id]);

  const fetchPostData = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load thread.');
      console.error(error);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setIsSubmitting(true);

    try {
      await axios.post(`/posts/${id}/replies`, { text: replyText });
      toast.success('Reply added! +5 Karma 🔥');
      setReplyText('');
      fetchPostData(); // Refresh to see the new reply
    } catch (error) {
      toast.error('Failed to post reply.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await axios.put(`/posts/${id}/accept`);
      toast.success('Request accepted! +10 Karma 🔥');
      fetchPostData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to accept request');
    }
  };

 if (loading) return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 w-full flex flex-col justify-start">
      <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 w-full border border-gray-100 shadow-sm animate-pulse">
        <div className="flex gap-3 mb-6">
          <div className="h-6 w-24 bg-violet-200/50 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-200/50 rounded-full"></div>
        </div>
        <div className="h-10 w-3/4 bg-gray-200/50 rounded-xl mb-4"></div>
        <div className="h-4 w-full bg-gray-100 rounded-md mb-2"></div>
        <div className="h-4 w-full bg-gray-100 rounded-md mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-100 rounded-md"></div>
      </div>
    </div>
  );
  if (!data.post) return <div className="text-center mt-20 font-bold text-gray-500">Post not found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* 1. Main Post Hero Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-xl border border-gray-100 shadow-xl rounded-3xl p-8 mb-10"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-3">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${
              data.post.postType === 'Doubt' 
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
            }`}>
              {data.post.postType}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-sm border ${
              data.post.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
              data.post.status === 'Accepted' ? 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' :
              'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              Status: {data.post.status}
            </span>
          </div>

          {/* Accept Button (Only shows if pending) */}
          {data.post.status === 'Pending' && (
            <button 
              onClick={handleAcceptRequest}
              className="bg-gray-900 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md"
            >
              Accept Request ✓
            </button>
          )}
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
          {data.post.title}
        </h1>

        {/* Note: We are using standard pre-wrap text here instead of markdown! */}
        <p className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed font-medium mb-8">
          {data.post.content}
        </p>
        {data.post.fileUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <p className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
              Attached File
            </p>
            {/* Note: Change 5000 to whatever port your backend is running on! */}
            <img 
              src={`http://localhost:5001${data.post.fileUrl}`} 
              alt="Post attachment" 
              className="w-full max-h-[500px] object-contain bg-gray-100"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
              }}
            />
          </div>
        )}

        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <Link to={`/profile/${data.post.author?._id}`} className="flex items-center gap-3 group">
            <img 
              src={`https://ui-avatars.com/api/?name=${data.post.author?.name}&background=random&color=fff&size=40`} 
              alt="avatar" 
              className="rounded-full shadow-sm group-hover:ring-2 ring-violet-500 transition-all"
            />
            <div className="flex flex-col">
              <span className="text-gray-900 text-sm font-bold group-hover:text-violet-600 transition-colors">
                {data.post.author?.name}
              </span>
              <span className="text-orange-500 text-xs font-bold">🔥 {data.post.author?.reputation || 0} Karma</span>
            </div>
          </Link>
          <span className="text-gray-400 text-sm font-bold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            {new Date(data.post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </motion.div>

      {/* 2. Replies Section */}
      <div className="pl-0 md:pl-8 border-l-0 md:border-l-4 border-violet-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Discussion ({data.replies.length})</h3>

        {/* Animated Reply List */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="space-y-6 mb-8"
        >
          {data.replies.map(reply => (
            <motion.div 
              key={reply._id} 
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0, transition: { type: "spring" } }
              }}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 relative"
            >
              {/* Note: Standard pre-wrap text instead of markdown */}
              <p className="text-gray-800 mb-4 whitespace-pre-wrap font-medium">
                {reply.text}
              </p>
              
              <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                <Link to={`/profile/${reply.author?._id}`} className="flex items-center gap-2 group">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${reply.author?.name}&background=random&color=fff&size=24`} 
                    alt="avatar" 
                    className="rounded-full"
                  />
                  <span className="text-gray-600 text-sm font-bold group-hover:text-violet-600 transition-colors">
                    {reply.author?.name}
                  </span>
                </Link>
                <span className="text-gray-300 mx-2">•</span>
                <span className="text-gray-400 text-xs font-medium">
                  {new Date(reply.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3. Reply Form Container */}
        <div className="bg-violet-50/50 rounded-3xl p-6 border border-violet-100">
          <form onSubmit={handleReplySubmit}>
            <textarea
              required
              rows="3"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a helpful reply..."
              className="w-full px-5 py-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium resize-none mb-4 shadow-sm"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 hover:bg-violet-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {isSubmitting ? 'Posting...' : 'Post Reply'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}