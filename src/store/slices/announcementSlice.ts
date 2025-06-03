import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Define interfaces
export interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    role: string;
    avatar?: string;
    subject?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: AnnouncementState = {
  announcements: [],
  loading: false,
  error: null,
};

// Create async thunks for fetching announcements
export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAnnouncements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/announcements");
      return response.data.data;
    } catch (error: unknown) {
      const err = error as { response?: { data: unknown }; message?: string };
      if (err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ error: err.message || "Something went wrong" });
    }
  }
);

// Create the announcement slice
const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAnnouncements.fulfilled,
        (state, action: PayloadAction<Announcement[]>) => {
          state.loading = false;
          state.announcements = action.payload;
        }
      )
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { error: string })?.error ||
          "Failed to fetch announcements";
      });
  },
});

export default announcementSlice.reducer;
