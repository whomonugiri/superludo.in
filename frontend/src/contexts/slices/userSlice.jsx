import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    balance: 0,
    unreadMessage: 0,
    cash: 0,
    reward: 0,
    bonus: 0,
  },
  reducers: {
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },

    updateWallet: (state, action) => {
      state.cash = action.payload.cash;
      state.reward = action.payload.reward;
      state.bonus = action.payload.bonus;
      state.balance = action.payload.balance;
    },
    updateUM: (state, action) => {
      state.unreadMessage = action.payload;
    },
  },
});

export const { updateWallet, updateBalance, updateUM } = userSlice.actions;

export default userSlice.reducer;
