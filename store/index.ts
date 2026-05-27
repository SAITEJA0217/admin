// store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Type of the entire Redux state
export type RootState = ReturnType<
    typeof store.getState
>;

// Type of dispatch
export type AppDispatch =
    typeof store.dispatch;