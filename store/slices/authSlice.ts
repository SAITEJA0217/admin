// store/slices/authSlice.ts

import {
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

export interface User {
    id: string;
    email: string;
    role:
        | "FOUNDER"
        | "INVESTOR"
        | "MANUFACTURER";
    isEmailVerified: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Called after successful login
        login: (
            state,
            action: PayloadAction<User>
        ) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        // Alternative action name if you prefer setUser()
        setUser: (
            state,
            action: PayloadAction<User>
        ) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        // Called on logout
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },

        // Alternative action name if you prefer clearUser()
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

// Export all actions
export const {
    login,
    setUser,
    logout,
    clearUser,
} = authSlice.actions;

// Export reducer as default
export default authSlice.reducer;