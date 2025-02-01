import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const backendUrl = "https://smartpaycoin.onrender.com";
export const requestPayout = createAsyncThunk(
  "payout/requestPayout",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/request-payout`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//End
// Verify Payout Action
export const verifyPayout = createAsyncThunk(
  "payout/verifyPayout",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/api/verify-payout`, {
        params: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//end;
const payoutSlice = createSlice({
  name: "payout",
  initialState: {
    paymentUrl: null,
    loading: false,
    error: null,
    verificationStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestPayout.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestPayout.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUrl = action.payload.paymentUrl;
      })
      .addCase(requestPayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Verify Payout
      .addCase(verifyPayout.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayout.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStatus = action.payload.message;
      })
      .addCase(verifyPayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default payoutSlice.reducer;
