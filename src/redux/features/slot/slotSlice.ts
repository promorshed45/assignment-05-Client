import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SlotState {
  selectedSlots: string[]; 
}

const initialState: SlotState = {
  selectedSlots: [],
};

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    selectSlot: (state, action: PayloadAction<string>) => {
      state.selectedSlots = [action.payload];
    },
    deselectSlot: (state, action: PayloadAction<string>) => {
      state.selectedSlots = state.selectedSlots.filter(
        (slot) => slot !== action.payload
      );
    },
    resetSlots: (state) => {
      state.selectedSlots = [];
    },
    // You can remove the clearSlots reducer if it's the same as resetSlots.
    clearSlots: (state) => {
      state.selectedSlots = [];
    },
  },
});

export const { selectSlot, deselectSlot, resetSlots, clearSlots } = slotSlice.actions;
export default slotSlice.reducer;
