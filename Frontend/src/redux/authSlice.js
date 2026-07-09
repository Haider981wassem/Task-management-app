import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem('user'));
const savedToken = localStorage.getItem('token');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: saved || null,
        token: savedToken || null
    },

    reducers: {
        loginSuccess: (state,action) =>{
            state.user = action.payload.user,
            state.token = action.payload.token
        },
        logout: (state) =>{
            state.user = null,
            state.token = null
        }
    }
});

export const {loginSuccess,logout} = authSlice.actions;
export default authSlice.reducer;