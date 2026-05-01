import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import { Toaster } from 'react-hot-toast'; 
import { motion } from 'framer-motion';

// Import all your pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      
      {/* THE MAGIC: Ambient Background Glows (with pointer-events-none to fix clicks!) */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-300/80 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
      <div className="pointer-events-none absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-fuchsia-300/80 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="pointer-events-none absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-300/80 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Global Toast Notifications Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Wrapping the app in z-10 so it sits above the background */}
      <div className="relative z-10">
        
        {/* Premium Vibrant Navbar - Slides in on load */}
        {user && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white/70 backdrop-blur-xl shadow-sm border-b border-gray-100/50 px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-50"
          >
            
            {/* Gradient Text Logo */}
            <Link to="/" className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
              College Connect
            </Link>
            
            <div className="flex items-center gap-4 md:gap-6">
              
              {/* Vibrant Gradient Button */}
              <Link 
                to="/create" 
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-[0_0_20px_rgba(167,139,250,0.4)] hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              >
                + New Request
              </Link>
              
              <div className="flex items-center gap-3 md:gap-4 border-l pl-4 md:pl-6 border-gray-200">
                {/* Clickable Profile Info */}
                <Link to={`/profile/${user._id}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=32`} 
                    alt="avatar" 
                    className="rounded-full shadow-sm group-hover:ring-2 ring-fuchsia-500 transition-all"
                  />
                  <div className="hidden md:flex flex-col">
                    <span className="text-gray-900 text-sm font-bold leading-tight group-hover:text-fuchsia-600 transition-colors">{user.name}</span>
                    <span className="text-orange-500 text-xs font-bold leading-tight">🔥 {user.reputation || 0} Karma</span>
                  </div>
                </Link>
                
                <button 
                  onClick={() => dispatch(logout())}
                  className="text-sm text-gray-400 hover:text-rose-500 font-bold transition-colors ml-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.nav>
        )}

        {/* Main Application Routing */}
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            
            {/* Protected Routes (Requires Login) */}
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/post/:id" element={user ? <SinglePost /> : <Navigate to="/login" />} />
            <Route path="/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
            <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;