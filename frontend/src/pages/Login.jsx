import { useState } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { useNavigate,Link } from 'react-router-dom'; 
import { setCredentials } from '../store/authSlice'; 
import axios from '../api/axios'; 
 
export default function Login() { 
 const [email, setEmail] = useState(''); 
 const [password, setPassword] = useState(''); 
 const dispatch = useDispatch(); 
 const navigate = useNavigate(); 
 
 const handleLogin = async (e) => { 
   e.preventDefault(); 
   try { 
     const res = await axios.post('/auth/login', { email, password }); 
     dispatch(setCredentials({ user: res.data, token: res.data.token })); 
     navigate('/'); 
   } catch (err) { 
     alert('Login failed. Check console.'); 
 
     console.error(err); 
   } 
 }; 
 
 return ( 
   <div className="flex h-screen items-center justify-center"> 
     <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md 
w-96"> 
       <h2 className="text-2xl font-bold mb-6 text-center">College Connect</h2> 
       <input 
         type="email" placeholder="Email" required 
         className="w-full mb-4 p-2 border rounded" 
         onChange={(e) => setEmail(e.target.value)} 
       /> 
       <input 
         type="password" placeholder="Password" required 
         className="w-full mb-6 p-2 border rounded" 
         onChange={(e) => setPassword(e.target.value)} 
       /> 
       <button className="w-full bg-blue-600 text-white p-2 rounded 
hover:bg-blue-700"> 
         Login 
       </button> 
       <p className="text-center text-sm text-gray-600 mt-4"> 
         Don't have an account?{' '} 
         <Link to="/register" className="text-blue-600 hover:underline"> 
           Sign up 
         </Link> 
       </p> 
     </form> 
   </div> 
 ); 
}