import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import UserAdminService from "./UserAdminService";
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
  userList: userInfo[] | null;
}


const initialState: UsersState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  userList: null,
};

export const getAccounts = createAsyncThunk(
  "userAdmin/getAll",
  async (_,thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.userInfo.token;
      console.log(token)
      const data = await UserAdminService.getUsers(token);
      console.log("slice admin list",data);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "userAdmin/delete user",
  async (userId: string, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.userInfo.token;
      const data = await UserAdminService.deleteUser(userId, token);
      const dataAfterDelete = await UserAdminService.getUsers(token);
      // console.log(data);
      // return data
      return dataAfterDelete;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

// export const updateAccount = createAsyncThunk(
//   "users/update user",
//   async (account: { email: string; password: string }, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       const data = await UserAdminService.updateUser(account,token);
//       // const dataAfterUpdate = await UserAdminService.getUsers(token);
//       // return dataAfterUpdate;
//       return data
//     } catch (error: any) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error?.message);
//     }
//   }
// );

export const UserAdminSlice = createSlice({
  name: "userListAdmin1",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccounts.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userList = action.payload;
        state.isSuccess = true;

      })
      .addCase(getAccounts.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userList = action.payload;
        state.isSuccess = true;
      })
      .addCase(deleteAccount.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
      })
      // .addCase(updateAccount.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(updateAccount.fulfilled, (state, action: PayloadAction<any>) => {
      //   state.isLoading = false;
      //   state.userList = action.payload;
      //   state.isSuccess = true;
      //   state.loggedIn = true;
      // })
      // .addCase(updateAccount.rejected, (state, action: PayloadAction<any>) => {
      //   state.isLoading = false;
      //   // state.isError = true;
      //   // state.message = action.payload;
      // });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const userAdmin = (state: RootState) => state.userAdmin;

export default UserAdminSlice.reducer;
