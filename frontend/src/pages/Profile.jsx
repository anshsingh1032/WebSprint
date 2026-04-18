import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from '../api/axios';

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState({ user: null, posts: [] });
  const [specializedTags, setSpecializedTags] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/users/${id}`);
      setProfileData(res.data);
      
      // Hackathon Magic: Automatically calculate specialized tags based on their posts
      const allTags = res.data.posts.flatMap(post => post.tags || []);
      
      // Count frequency of each tag
      const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});
      
      // Sort by most used and grab the top 5
      const topTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(entry => entry[0]);
        
      setSpecializedTags(topTags);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load profile');
    }
  };

  const handleUpdateLinkedIn = async () => {
    const url = window.prompt("Enter your LinkedIn URL (https://linkedin.com/in/...):", profileData.user.linkedIn);
    
    // Only update if they typed something and didn't hit cancel
    if (url !== null) {
      try {
        await axios.put(`/users/${id}/linkedin`, { linkedIn: url });
        toast.success('LinkedIn profile updated! 🔗');
        fetchProfile(); // Refresh to show new URL
      } catch (error) {
        toast.error('Failed to update LinkedIn');
        console.error(error);
      }
    }
  };

  // Show a loading state until the data arrives from the backend
  if (!profileData.user) return <div className="text-center mt-20 font-medium text-gray-500">Loading Profile...</div>;

  // Check if the person looking at the profile is the owner of the profile
  const isOwnProfile = currentUser?._id === profileData.user._id;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      
      {/* Top Banner & Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="px-8 pb-8 relative">
          <img 
            src={`https://ui-avatars.com/api/?name=${profileData.user.name}&background=random&color=fff&size=120`} 
            alt="avatar" 
            className="w-24 h-24 rounded-full border-4 border-white absolute -top-12 shadow-md bg-white"
          />
          
          <div className="pt-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                {profileData.user.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm">
                  🔥 {profileData.user.reputation} Karma
                </span>
                
                {profileData.user.linkedIn ? (
                  <a 
                    href={profileData.user.linkedIn} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    🔗 LinkedIn Profile
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm italic">No LinkedIn provided</span>
                )}
              </div>
            </div>

            {/* Quick Edit Button if it's their own profile */}
            {isOwnProfile && (
              <button 
                onClick={handleUpdateLinkedIn}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300 shadow-sm"
              >
                ✏️ Edit LinkedIn
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Specialties & Tags */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Specialized In</h3>
            
            {specializedTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {specializedTags.map(tag => (
                  <span key={tag} className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm bg-gray-50 p-3 rounded border border-gray-100">
                Not enough activity to determine specialties yet. Create some posts!
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Requests ({profileData.posts.length})</h3>
          
          {profileData.posts.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
              No requests made yet.
            </div>
          ) : (
            <div className="space-y-4">
              {profileData.posts.map(post => (
                <div key={post._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{post.title}</h4>
                    
                    {/* Status Badge */}
                    <span className={`text-xs px-2 py-1 rounded font-semibold border ${
                      post.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      post.status === 'Accepted' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      'bg-green-50 text-green-700 border-green-200'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  
                  <Link to={`/post/${post._id}`} className="inline-block mt-2 text-blue-600 font-medium hover:underline text-sm">
                    View Thread &rarr;
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}