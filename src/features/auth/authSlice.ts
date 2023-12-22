import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppUser } from "../../App/types/users";
import { User } from "firebase/auth";

type State = {
  authenticated: boolean;
  currentUser: AppUser | null;
};

const initialState: State = {
  authenticated: false,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SignIn: {
      //shaping data to cofig with data in fireStore.
      reducer: (state, action: PayloadAction<AppUser>) => {
        state.authenticated = true;
        state.currentUser = action.payload;
      },
      prepare: (user: User) => {
        const mapped: AppUser = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          providerId: user.providerData[0].providerId,
        };
        return {payload: mapped}
      },
    },

    logOut: (state) => {
      state.authenticated = false;
      state.currentUser = null;
    },
  },
});

export const { SignIn, logOut } = authSlice.actions;
