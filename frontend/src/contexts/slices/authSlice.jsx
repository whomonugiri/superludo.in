import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    textData: null,
    isAuth: false,
    playerId: null,
    deviceId: null,
    token: null,
    refCode: null,
    fullName: null,
    profile: null,
    mobileNumber: null,
    loading: true,
    config: {},
  },
  reducers: {
    loadingoff: (state) => {
      state.loading = false;
    },
    setTextData: (state, action) => {
      state.textData = action.payload;
    },
    updateMe: (state, action) => {
      action.payload.profilePic && (state.profile = action.payload.profilePic);
      action.payload.fullName && (state.fullName = action.payload.fullName);
    },
    authUser: (state, action) => {
      state.isAuth = true;
      state.playerId = action.payload.username;

      state.refCode = action.payload.referralCode;
      state.fullName = action.payload.fullName;
      state.profile = action.payload.profile;
      state.mobileNumber = action.payload.mobileNumber;
      // state.config = { ...action.payload.config };
      for (let key in action.payload.config) {
        state[key] = action.payload.config[key];
      }

      if (action.payload.kycData) {
        for (let key in action.payload.kycData) {
          state[key] = action.payload.kycData[key];
        }
      }

      localStorage.setItem("_tk", action.payload._tk);
      localStorage.setItem("_di", action.payload._di);
    },
    logout: (state) => {
      state.isAuth = false;
      state.playerId = null;
      localStorage.removeItem("_tk");
      localStorage.removeItem("_di");

      state.refCode = null;
      state.fullName = null;
      state.profile = null;
      state.mobileNumber = null;
    },
  },
});

export const { setTextData, authUser, logout, loadingoff, updateMe } =
  authSlice.actions;

export default authSlice.reducer;
