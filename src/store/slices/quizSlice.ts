import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Define interfaces
export interface Quiz {
  _id: string;
  title: string;
  course: string;
  topic: string;
  dueDate: string;
  instructions?: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    points: number;
  }[];
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  topic: string;
  dueDate: string;
  description?: string;
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
}

interface QuizState {
  quizzes: Quiz[];
  assignments: Assignment[];
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: QuizState = {
  quizzes: [],
  assignments: [],
  loading: false,
  error: null,
};

// Create async thunks for fetching quizzes
export const fetchQuizzes = createAsyncThunk(
  "quizzes/fetchQuizzes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/quizzes");
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

// Create the quiz slice
const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchQuizzes.fulfilled,
        (state, action: PayloadAction<Quiz[]>) => {
          state.loading = false;
          state.quizzes = action.payload;
        }
      )
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { error: string })?.error ||
          "Failed to fetch quizzes";
      });
  },
});

export default quizSlice.reducer;
