import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {
    _id: "",
    userId: "",
    name: "",
    email: "",
    image: "",
    role: "",
    exp: "",
    iat: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.token = "";
      state.user = {
        _id: "",
        userId: "",
        name: "",
        email: "",
        image: "",
        role: "",
        exp: "",
        iat: "",
      };
    },
  },
});

export const { setToken, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
