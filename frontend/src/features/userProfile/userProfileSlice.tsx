import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import UserProfileService from "./UserProfileService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Define a type for the slice state
export interface userInfo {
  _id: string;
  name: string;
  token: string;
  isAdmin: boolean;
  email: string;
}
export interface UsersState {
  isLoading: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  message?: string;
  loggedIn: boolean;
  userUpdate: userInfo | null;
}
export const userInfoFromStorage: userInfo =
  localStorage.getItem("userInfo") ?
  JSON.parse(localStorage.getItem("userInfo")): [];

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  loggedIn: false,
  message: null,
  userUpdate: userInfoFromStorage || null,
};
interface FetchUserParams {
  email: string;
  password: string;
  name?: string
}



export const updateUserProfile = createAsyncThunk(
  "createAccount/post",
  async (account: userInfo, thunkAPI) => {
    console.log(account)
    try {
      const token = thunkAPI.getState().users.userInfo.token;
      const data = await UserProfileService.updateUser(account, token);
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
export const UserProfileSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState ,
  reducers: {
    resetUpdateUser: (state, action: PayloadAction<userInfo>) => {
      state.userUpdate = action.payload;

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase( updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase( updateUserProfile.fulfilled, (state, action: PayloadAction<userInfo>) => {
        state.isLoading = false;
        state.userUpdate = action.payload;
        state.isSuccess = true
      })
      .addCase( updateUserProfile.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
      });
     
  },
});

export const { resetUpdateUser } = UserProfileSlice.actions;


// Other code such as selectors can use the imported `RootState` type
export const userUpdateProfile = (state: RootState) => state.userProfile;

export default UserProfileSlice.reducer;
