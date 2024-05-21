import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    user: null,
    profile: null,
    otherUsers: null,
    getTimeLinePosts: null,
  },
  reducers: {
    //multiple reducers
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setTimeLinePosts: (state, action) => {
      state.getTimeLinePosts = action.payload;
    },
  },
});

export const { getProfile, getUser, getOtherUsers, setTimeLinePosts } =
  UserSlice.actions;
export default UserSlice.reducer;
