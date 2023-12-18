import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../App/types/users";

type State = {
  authenticated: boolean;
  currentUser: User | null;
};

const initialState: State = {
  authenticated: false,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SignIn: (state, action) => {
      state.authenticated = true;
      state.currentUser = {
        email: action.payload.email,
        photoURL: "/user.png",
      };
    },
    SignOut: (state) => {
      state.authenticated = false;
      state.currentUser = null;
    },
  },
});

export const { SignIn, SignOut } = authSlice.actions;
