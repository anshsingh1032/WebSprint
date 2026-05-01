import { createSlice } from '@reduxjs/toolkit'; 
 
const initialState = { 
  user: JSON.parse(localStorage.getItem('user')) || null, 
  token: localStorage.getItem('token') || null, 
}; 
 
const authSlice = createSlice({ 
  name: 'auth', 
  initialState, 
  reducers: { 
    setCredentials: (state, action) => { 
      state.user = action.payload.user; 
      state.token = action.payload.token; 
      localStorage.setItem('user', JSON.stringify(action.payload.user)); 
      localStorage.setItem('token', action.payload.token); 
    }, 
    logout: (state) => { 
      state.user = null; 
      state.token = null; 
      localStorage.removeItem('user'); 
      localStorage.removeItem('token'); 
    },

    addKarma: (state, action) => {
      if (state.user) {

        state.user.reputation = (state.user.reputation || 0) + action.payload;

        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  }, 
}); 
 

export const { setCredentials, logout, addKarma } = authSlice.actions; 
export default authSlice.reducer;