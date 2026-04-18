import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import axios from '../api/axios'; 
import { motion } from 'framer-motion';

export default function Home() { 
  const [posts, setPosts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
 
  useEffect(() => { 
    // Debounce the search slightly to avoid too many API calls 
    const delayDebounceFn = setTimeout(() => { 
      fetchPosts(searchTerm); 
    }, 300); 
 
    return () => clearTimeout(delayDebounceFn); 
  }, [searchTerm]); 
 
  const fetchPosts = async (searchQuery = '') => { 
    try { 
      const res = await axios.get(`/posts?search=${searchQuery}`); 
      setPosts(res.data); 
    } catch (error) { 
      console.error("Error fetching posts:", error); 
    } 
  }; 
 
  return ( 
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text tracking-tight">
            Community Feed
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">Help others or request study materials.</p>
        </div>
        
        <div className="w-full md:w-96 relative">
          <input
            type="text"
            placeholder="Search posts or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3.5 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 shadow-sm transition-all text-gray-700 font-medium"
          />
        </div>
      </div>

      {/* The Animated Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-medium bg-white rounded-2xl border border-gray-200 shadow-sm">
          No posts found. Try a different search!
        </div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 } 
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] rounded-3xl p-6 flex flex-col justify-start transition-all duration-300"
            >
              {/* Badge & Date */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${
                  post.postType === 'Doubt' 
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                }`}>
                  {post.postType}
                </span>
                <span className="text-gray-400 text-xs font-bold bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-gray-900 mb-2 line-clamp-2 leading-tight">
                {post.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow font-medium">
                {post.content}
              </p>

              {/* Specialty Tags */}
              <div className="flex flex-wrap gap-2 mb-6 justify-start">
                {post.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs font-bold text-violet-700 bg-violet-100/80 px-3 py-1.5 rounded-lg border border-violet-200">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer: Author & Link */}
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                <Link to={`/profile/${post.author?._id}`} className="flex items-center gap-3 group">
                  <div className="relative">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${post.author?.name}&background=random&color=fff&size=36`} 
                      alt="avatar" 
                      className="rounded-full shadow-sm group-hover:ring-2 ring-violet-500 transition-all"
                    />
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="text-gray-900 text-sm font-bold group-hover:text-violet-600 transition-colors">
                      {post.author?.name}
                    </span>
                    <span className="text-orange-500 text-xs font-bold">
                      🔥 {post.author?.reputation || 0} Karma
                    </span>
                  </div>
                </Link>

                <Link 
                  to={`/post/${post._id}`} 
                  className="bg-gray-900 hover:bg-violet-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  View &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  ); 
}