import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import UserUpdateService from "./UserUpdateService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Define a type for the slice state
export interface userInfo {
  name: string;
password: string;
  email: string;
}
export interface userData {
  _id: string,
  name: string,
  email: string,
  isAdmin: boolean
 }
export interface UsersState {
  isLoading: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  userInfo: userData | null;
}


const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userInfo: null,
};

export const updateUser = createAsyncThunk(
  "createAccount/post",
  async (account: userData, thunkAPI) => {
    console.log(account)
    try {
      const token = thunkAPI.getState().users.userInfo.token;
      const data = await UserUpdateService.updateUser(account, token);
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);


export const UserUpdateSlice = createSlice({
  name: "UserUpdate",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState ,
  reducers: {
    userUpdateReset: (state) => {
state.isSuccess = false
state.userInfo = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser .pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser .fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.isSuccess = true
      })
      .addCase(updateUser .rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
      });
  },
});

export const { userUpdateReset } = UserUpdateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userUpdateInfo = (state: RootState) => state.userUpdate;

export default UserUpdateSlice.reducer;
