import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    wishlistHandler: (state, action) => {
      const slugName = action.payload.slugName;
      if (!state.currentUser.Wishlist.includes(slugName)) {
        state.currentUser.Wishlist.push(slugName);
      } else {
        const newWishlist = state.currentUser.Wishlist.filter(
          (e) => e !== slugName
        );
        state.currentUser.Wishlist = newWishlist;
      }
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  wishlistHandler,
} = UserSlice.actions;
export default UserSlice.reducer;
