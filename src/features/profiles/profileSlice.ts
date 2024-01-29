import { PayloadAction } from "@reduxjs/toolkit";
import {
  GenericState,
  createGenericSlice,
} from "../../App/store/generticSlice";
import { Profile } from "../../App/types/profile";
import { Timestamp } from "firebase/firestore";

type State = {
  data: Profile[];
};

const initialState: State = {
  data: [],
};

export const profileSlice = createGenericSlice({
  name: "profiles",
  initialState: initialState as GenericState<Profile[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<Profile[]>) => {
        //fix the problem that we can keep them consitenyly 
        state.data = action.payload.map((profile) => {
          const prevProfile = state.data.find((x) => x.id === profile.id);
          return prevProfile ? { ...prevProfile, ...profile } : profile;
        });
        state.status = "finished";
      },
      prepare: (profiles) => {
        let profileArray: Profile[] = [];
        Array.isArray(profiles)
          ? (profileArray = profiles)
          : profileArray.push(profiles);
        const mapped = profileArray.map((profile) => {
          return {
            ...profile,
            createdAt: (profile.createdAt as unknown as Timestamp)
              .toDate()
              .toISOString(),
          };
        });
        return { payload: mapped };
      },
    },
    setFollowing: (state, action) => {
      //create new function to check follow
      state.data = state.data.map((profile) => {
        if (profile.id !== action.payload.id) return profile;
        else {
          profile.isFollowing = action.payload.isFollowing;
          return profile;
        }
      });
    },
  },
});

export const actions = profileSlice.actions;
