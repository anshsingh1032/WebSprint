import { useState } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { useNavigate, Link } from 'react-router-dom'; 
import { setCredentials } from '../store/authSlice'; 
import axios from '../api/axios'; 
 
export default function Register() { 
 const [name, setName] = useState(''); 
 const [email, setEmail] = useState(''); 
 const [password, setPassword] = useState(''); 
 const dispatch = useDispatch(); 
 const navigate = useNavigate(); 
 
 const handleRegister = async (e) => { 
   e.preventDefault(); 
   try { 
     const res = await axios.post('/auth/register', { name, email, password }); 

     dispatch(setCredentials({ user: res.data, token: res.data.token })); 
     navigate('/'); 
   } catch (err) { 
     alert(err.response?.data?.message || 'Registration failed. Check console.'); 
     console.error(err); 
   } 
 }; 
 
 return ( 
   <div className="flex h-screen items-center justify-center bg-gray-50"> 
     <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md 
w-96"> 
       <h2 className="text-2xl font-bold mb-6 text-center">Join College 
Connect</h2> 
       
       <input 
         type="text" placeholder="Full Name" required 
         className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 
focus:ring-blue-500" 
         value={name} onChange={(e) => setName(e.target.value)} 
       /> 
       <input 
         type="email" placeholder="College Email" required 
         className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 
focus:ring-blue-500" 
         value={email} onChange={(e) => setEmail(e.target.value)} 
 
 
       /> 
       <input 
         type="password" placeholder="Create Password" required 
         className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring-2 
focus:ring-blue-500" 
         value={password} onChange={(e) => setPassword(e.target.value)} 
       /> 
       
       <button className="w-full bg-blue-600 text-white p-2 rounded 
hover:bg-blue-700 font-medium mb-4"> 
         Sign Up 
       </button> 
 
       <p className="text-center text-sm text-gray-600"> 
         Already have an account?{' '} 
         <Link to="/login" className="text-blue-600 hover:underline"> 
           Log in 
         </Link> 
       </p> 
     </form> 
   </div> 
 ); 
}