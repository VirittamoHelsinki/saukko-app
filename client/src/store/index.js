/*
  Goal is to replace context and zustand completely.
*/

import { configureStore } from "@reduxjs/toolkit"
import headingSlice from "./redux/headingSlice"

export const store = configureStore({
  reducer: {
    heading: headingSlice.reducer
  }
})