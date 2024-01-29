import { Follow } from "../../../App/types/profile";
import { GenericActions, GenericState, createGenericSlice } from "../../../App/store/generticSlice";

type State = {
  data: Follow[];
};

const initialState: State = {
  data: [],
};

export const followSlice = createGenericSlice({
  name: "follow",
  initialState: initialState as GenericState<Follow[]>,
  reducers: {},
});

export const actions = followSlice.actions as GenericActions<Follow[]>;
