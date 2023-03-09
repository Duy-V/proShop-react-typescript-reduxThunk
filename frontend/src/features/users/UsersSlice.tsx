import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import UsersService from "./UsersService";
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
  userInfo: userInfo | null;
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
  userInfo: userInfoFromStorage || null,
};
interface FetchUserParams {
  email: string;
  password: string;
}

export const loginAccount = createAsyncThunk(
  "users/login",
  async (account: { email: string; password: string }, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      const data = await UsersService.login(account);
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const UsersSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState ,
  reducers: {
    logoutAccount(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem('shippingAddress')
      localStorage.removeItem('paymentMethod')
      localStorage.removeItem('cartItems')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAccount.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        state.isSuccess = true
      })
      .addCase(loginAccount.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
      });
  },
});

export const { logoutAccount } = UsersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userLogin = (state: RootState) => state.users;

export default UsersSlice.reducer;
