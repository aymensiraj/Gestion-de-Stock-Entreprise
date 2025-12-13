import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movements : [
    {id:1,article:"pc",type:"Entrée",quantite:"100",commentaire:"ooooooo",date:"2024-06-09"}
  ],
}

const movementsSlice = createSlice({
  name: "movements",
  initialState,
  reducers: {
    addMovement: (state, action) => {
      state.movements.push(action.payload);
     }
  }
});

export const { addMovement } = movementsSlice.actions;
export default movementsSlice.reducer;
