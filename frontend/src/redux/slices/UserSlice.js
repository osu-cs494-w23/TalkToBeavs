import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        values
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", values);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  "user/follow",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/social/follow_user", values);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: null,
  isLoggedIn: false,
  message: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.message = action.payload.message;
      state.isLoading = false;
      state.error = "Login Failed";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.message = action.payload.message;
      state.isLoading = false;
      state.error = "Register Failed";
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state) => state.user;
