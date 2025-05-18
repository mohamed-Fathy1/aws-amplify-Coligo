import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Define interfaces
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Create async thunks for login and logout
export const login = createAsyncThunk(
  "auth/login",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login");

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data: unknown }; message?: string };
      if (err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ error: err.message || "Something went wrong" });
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/api/auth/logout");

      // Remove token from localStorage
      localStorage.removeItem("token");

      return null;
    } catch (error: unknown) {
      const err = error as { response?: { data: unknown }; message?: string };
      if (err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ error: err.message || "Something went wrong" });
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { error: string })?.error || "Login failed";
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { error: string })?.error || "Logout failed";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
