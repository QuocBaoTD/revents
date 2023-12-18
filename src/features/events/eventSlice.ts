import { PayloadAction } from "@reduxjs/toolkit";
import { AppEvent } from "../../App/types/events";
import { Timestamp } from "firebase/firestore";
import {
  GenericActions,
  GenericState,
  createGenericSlice,
} from "../../App/store/generticSlice";

type State = {
  data: AppEvent[];
};

const initialState: State = {
  data: [],
};

export const eventSlice = createGenericSlice({
  name: "events",
  initialState: initialState as GenericState<AppEvent[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.data = action.payload;
        state.status = "finished";
      },
      prepare: (events: any) => {
        let eventArray: AppEvent[] = [];
        Array.isArray(events) ? (eventArray = events) : eventArray.push(events); //using new Array to make event always array
        const mapped = eventArray.map((e: any) => {
          return { ...e, date: (e.date as Timestamp).toDate().toISOString() }; //open event in prepare and chaning date as timetamp
        });
        return { payload: mapped };
      },
    },
    // createEvent: (state, action) => {
    //   state.events.push(action.payload);
    // },
    // updateEvent: (state, action) => {
    //   state.events[
    //     state.events.findIndex((evt) => evt.id === action.payload.id)
    //   ] = action.payload;
    // },
    // deleteEvent: (state, action) => {
    //   state.events.splice(
    //     state.events.findIndex((evt) => evt.id === action.payload),
    //     1
    //   );
    // },
  },
});

export const actions = eventSlice.actions as GenericActions<AppEvent[]>;
