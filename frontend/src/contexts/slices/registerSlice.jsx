import { createSlice } from "@reduxjs/toolkit";
import { RESEND_TIMER } from "../../utils/constants";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    fullName: "",
    mobileNumber: "",
    referralCode: "",
    otpRef: "",
    timer: RESEND_TIMER,
    action: "",
  },
  reducers: {
    saveUserData: (state, action) => {
      state.fullName = action.payload.fullName;
      state.mobileNumber = action.payload.mobileNumber;
      state.referralCode = action.payload.referralCode;
      state.action = action.payload.action;
    },
    releaseUserData: (state) => {
      state.fullName = "";
      state.mobileNumber = "";
      state.referralCode = "";
      state.action = "";
      state.timer = RESEND_TIMER;
    },
    saveOtpRef: (state, action) => {
      state.otpRef = action.payload;
    },
    resetTimer: (state) => {
      state.timer = RESEND_TIMER;
    },
    playTimer: (state) => {
      state.timer -= 1;
    },
  },
});

export const {
  saveUserData,
  saveOtpRef,
  playTimer,
  resetTimer,
  releaseUserData,
} = registerSlice.actions;

export default registerSlice.reducer;
