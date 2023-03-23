import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderListService from "./orderListService";
import { AppDispatch } from "../../store";
// import { extractErrorMessage } from '../../utils'

// Define a type for the slice state
interface FetchProductParams {
  productId: string;
}
export const cartItemsFromStorage: IProduct[] = localStorage.getItem(
  "cartItems"
)
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
export const userInfoFromStorage: userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

export interface IOrderItem {
  image: string;
  name: string;
  price: number;
  qty: number;
  product: {
    _id: string;
  };
}

export interface IInitialOrder {
  orderItems: IOrderItem[] | [];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  } | null;
  paymentMethod: string | null;
  itemsPrice: number | null;
  shippingPrice: number | null;
  taxPrice: number | null;
  totalPrice: number | null;
  isPaid: false;
  isDelivered: false;
  user: {
    _id: string;
    name: string;
  };
}

export interface IInitialOrderState {
  orders: IInitialOrder[] | null;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}
export type AppThunk<ReturnType = void> = (thunkAPI: ThunkAPI) => ReturnType;

const initialState: IInitialOrderState = {
  orders: null,
  isSuccess: false,
  isError: false,
  isLoading: false
};
type Dispatch = /*unresolved*/ any;
interface ThunkAPI {
  dispatch: Dispatch;
  getState: () => RootState;
}

export const getOrderList = createAsyncThunk(
  "getOrderList/getAllLLLLL", async (_,thunkAPI) => {
  try {
    console.log('orderlist getALLLLL')
    const token = thunkAPI.getState().users.userInfo.token;
    const data = await OrderListService.getOrders(token);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    // return thunkAPI.rejectWithValue(error.message);
  }
});

export const OrderSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderList.pending, (state) => {})
      .addCase(getOrderList.fulfilled, (state, action: PayloadAction<any>) => {
        state.orders = action.payload;
        state.isSuccess = true;
        state.isError = true;
        state.isLoading = true
      })
      .addCase(
        getOrderList.rejected,
        (state, action: PayloadAction<any>) => {
          state.isSuccess = true;
        state.isLoading = false
        state.isError = true;
        }
      );
  },
});

export const {} = OrderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrder = (state: RootState) => state.orderList;
// export const productDetails = (state: RootState) => state.products.product;

export default OrderSlice.reducer;
