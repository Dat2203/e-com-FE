import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    open: false,
  },
  reducers: {
    setNoti: (state, action) => {
      state.message = action.payload;
      state.open = true;
    },
    closeNoti: (state, action) => {
      state.open = false;
    },
  },
});
export const { setNoti, closeNoti } = NotificationSlice.actions;
export default NotificationSlice.reducer;
