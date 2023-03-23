import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import UsersService from "./UserDetailsService";
import UserAdminService from "../userAdmin/UserAdminService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  userDetails: userInfo | null;
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
  userDetails: userInfoFromStorage || null,
};



export const getDetailUserInfo = createAsyncThunk(
  "users/getone",
  async (userId: string, thunkAPI) => {
    console.log(userId)
    try {
      const token = thunkAPI.getState().users.userInfo.token;
      const data = await UsersService.getUserDetail(userId, token);
      const dataAfterUpdate = await UserAdminService.getUsers(token);

      return dataAfterUpdate;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const UserDetailsSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState ,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailUserInfo.fulfilled, (state, action: PayloadAction<userInfo>) => {
        state.isLoading = false;
        state.userDetails = action.payload;
        state.isSuccess = true
      })
      .addCase(getDetailUserInfo.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
      })
     
     
  },
});


// Other code such as selectors can use the imported `RootState` type
export const userDetailsInfo = (state: RootState) => state.userDetails;

export default UserDetailsSlice.reducer;
