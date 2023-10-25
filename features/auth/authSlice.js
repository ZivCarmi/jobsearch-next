import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isNewUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const accessToken = action.payload.accessToken;

      console.log("in setCredentials", action.payload);

      state.token = accessToken;
      state.user = action.payload.user;
    },
    setUser(state, action) {
      console.log("in setUser", action.payload);

      state.user = action.payload.user;
    },
    setIsNewUser(state, action) {
      state.isNewUser = action.payload;
    },
    verifyUser(state, action) {
      state.user.verified = action.payload;
    },
    logOut(state, action) {
      state.token = null;
      state.user = null;
      state.isNewUser = false;
    },
  },
});

export const getUser = (state) => state.auth.user;

export const { setCredentials, setUser, setIsNewUser, verifyUser, logOut } =
  authSlice.actions;

export default authSlice.reducer;
