import { createSlice } from "@reduxjs/toolkit";
import { todoAsyncAdded, todoAsyncRejectd } from "../todos/todoSlice";

const initialState = {
  status: "idle" /* status: loading | idle | | succeeded | fatel  */
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      /* ==============todoAsyncAdded================== */
      .addCase(todoAsyncAdded.pending, (state, action) => {
        /* type: "todos/asyncAdded/pending" */
        state.status = "loading";
      })
      .addCase(todoAsyncAdded.fulfilled, (state, action) => {
        state.status = "idle";
      })
      /* ==============todoAsyncRejectd================== */
      .addCase(todoAsyncRejectd.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(todoAsyncRejectd.rejected, (state, actio) => {
        state.status = "idle";
        console.error("appSlice rejected!");
      });
  }
});

export default appSlice.reducer;
