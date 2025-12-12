import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles : [
    { id: 1, name: "Vis à bois 5x50", reference: "VB5050", category: "Hardware", quantity: 150, unit: "Box", seuil_min: 20, fournisseur: "MetalPro" },
    { id: 2, name: "Câble électrique 2.5mm²", reference: "CE25", category: "Electrical", quantity: 300, unit: "m", seuil_min: 50, fournisseur: "SteelCo" },
  ],
  fournisseurs : ["MetalPro", "SteelCo", "Fasteners Morocco", "Atlas Supplies"],
  categories : ["Hardware", "Electrical", "Matières premières", "Emballage"],
  unites : [
    {symbol : "kg", name : "kilos"},
    {symbol : "m", name : "Mètre"},
    {symbol : "L", name : "Litre"},
    {symbol : "Box", name : "Box"},
    {symbol : "Pack", name : "Pack"}
  ]
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticle: (state, action) => {
      state.articles.push(action.payload);
    },

    updateArticle: (state, action) => {
      const index = state.articles.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.articles[index] = action.payload;
      }
    },

    deleteArticle: (state, action) => {
      state.articles = state.articles.filter(a => a.id !== action.payload);
    }
  }
});

export const { addArticle, updateArticle, deleteArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
