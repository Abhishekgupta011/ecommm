import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"), // Set true if a token exists,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("token" , action.payload.token)
    },
    onLogout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;
