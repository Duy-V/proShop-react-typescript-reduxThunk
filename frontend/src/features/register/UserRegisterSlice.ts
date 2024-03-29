import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import UserRegisterService from "./UserRegisterService";
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
  isAdmin: boolean,
  token: string
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

export const createAccount = createAsyncThunk(
  "createAccount/post",
  async (account: userInfo, thunkAPI) => {
    console.log(account)
    try {
      const data = await UserRegisterService.createNewUser(account);
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);


export const UserRegisterSlice = createSlice({
  name: "userRegister",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState ,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        state.isSuccess = true
      })
      .addCase(createAccount.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
      });
  },
});


// Other code such as selectors can use the imported `RootState` type
export const userRegister = (state: RootState) => state.userRegister;

export default UserRegisterSlice.reducer;
