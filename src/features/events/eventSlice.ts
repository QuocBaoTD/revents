import { PayloadAction } from "@reduxjs/toolkit";
import { AppEvent } from "../../App/types/events";
import { Timestamp } from "firebase/firestore";
import {
  GenericActions,
  GenericState,
  createGenericSlice,
} from "../../App/store/generticSlice";
import { auth } from "../../App/config/firebase";

type State = {
  data: AppEvent[];
  loadedInitial: boolean;
};

const initialState: State = {
  data: [],
  loadedInitial: false,
};

export const eventSlice = createGenericSlice({
  name: "events",
  initialState: initialState as GenericState<AppEvent[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.data = removeDuplicate([...action.payload, ...state.data]); //update event value.
        state.status = "finished";
        state.loadedInitial = true;
      },
      prepare: (events: any) => {
        let eventArray: AppEvent[] = [];
        Array.isArray(events) ? (eventArray = events) : eventArray.push(events); //using new Array to make event always array
        const mapped = eventArray.map((e: any) => {
          return {
            ...e,
            date: (e.date as Timestamp).toDate().toISOString(),
            isHost: auth.currentUser?.uid === e.hostUid, // check currentUser is the host
            isGoing: e.attendeeIds?.includes(auth.currentUser?.uid), // check current User is attendee ?.
          }; //open event in prepare and chaning date as timetamp
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

function removeDuplicate(events: AppEvent[]) {
  return Array.from(new Set(events.map((x) => x.id)))
    .map((id) => events.find((a) => a.id === id) as AppEvent)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); //fix error the date is reverse
}
