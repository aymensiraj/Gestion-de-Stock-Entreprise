import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice";
import movementsReducer from "./movementsSlice";

const store = configureStore({
  reducer: {
    articles: articlesReducer, 
    movements: movementsReducer,  
  },
});

export default store
