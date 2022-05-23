import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  status: null,
  error: null,
};

export const mapFetch = createAsyncThunk(
  "map/mapFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://coinmap.org/api/v1/venues/?limit=28400"
      );

      return res?.data;
    } catch (error) {
      return rejectWithValue(error?.res?.data);
    }
  }
);
const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers: {
    [mapFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [mapFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [mapFetch.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default mapSlice.reducer;
