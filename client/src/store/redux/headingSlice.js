import { createContext, useContext, useState } from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  heading: "",
  subHeading: "",
  siteTitle: "",
};

const headingSlice = createSlice({
  name: "heading",
  initialState,
  reducers: {
    setHeading: (state, action) => {
      state.heading = action.payload;
    },
    setSubHeading: (state, action) => {
      state.subHeading = action.payload;
    },
    setSiteTitle: (state, action) => {
      state.siteTitle = action.payload;
    },
  },
});

export const {
  setHeading,
  setSubHeading,
  setSiteTitle,
} = headingSlice.actions;