import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movements : [],
}

const movementsSlice = createSlice({
  name: "movements",
  initialState,
  reducers: {
    // addMovement: (state, action) => {
    //   state.push(action.payload);
    // }
  }
});

export const { addMovement } = movementsSlice.actions;
export default movementsSlice.reducer;
