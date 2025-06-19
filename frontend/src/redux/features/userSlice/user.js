import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkUserAuth = createAsyncThunk(
  "/user/checkUserAuth",
  async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/api/auth/checkUserAuth`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();

      return {result};
    } catch (err) {
      console.log(err);
      throw new Error("error while authenticating user.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,
    authStatus: null,
    isLoading: false,
    isError: false,
  },
  reducers: {
    setUserProfile: (state, action) => {
      console.log(action.payload);
      state.userProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
        builder
        .addCase(checkUserAuth.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
            state.authStatus = null;
        })
        .addCase(checkUserAuth.fulfilled, (state,action) => {
            state.isLoading = true;
            state.isError = null;
            state.authStatus = action.payload.result.authstatus
            state.userProfile = action.payload.result.user
        })
        .addCase(checkUserAuth.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.authStatus = null;
        })
  }
});

export const { setUserProfile } = userSlice.actions;

export default userSlice.reducer;
