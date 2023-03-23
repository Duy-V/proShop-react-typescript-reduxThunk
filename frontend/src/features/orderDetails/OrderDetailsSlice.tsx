import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderDetailsService from "./OrderDetailsService";
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
  export const userInfoFromStorage: userInfo =
  localStorage.getItem("userInfo") ?
  JSON.parse(localStorage.getItem("userInfo")): [];

export interface IOrderItem {
  image: string,
  name: string,
  price: number,
  qty:  number,
  product: {
      _id: string
  }
}
export interface userInfo {
  _id: string;
  name: string;
  isAdmin?: boolean;
  email: string;
}
export interface IInitialOrder {  
  
      orderItems: IOrderItem[] | [];
      shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
      } | null;
      user: userInfo,
      paymentMethod: string | null;
      itemsPrice: number | null;
      shippingPrice: number | null;
      taxPrice: number | null;
      totalPrice: number | null;
      isPaid: boolean,
      isDelivered: boolean,
      _id: string,
    };
  
export interface IInitialOrderState {   
  order: IInitialOrder| null
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;

}


    
export type AppThunk<ReturnType = void> = (thunkAPI: ThunkAPI) => ReturnType;


const initialState: IInitialOrderState = {  
  order: null,
  isSuccess: false,
  isError: false,
  isLoading: false

};
type Dispatch = /*unresolved*/ any;
interface ThunkAPI {
  dispatch: Dispatch;
  getState: () => RootState;
}

export const getOrderDetails = createAsyncThunk<
  AppThunk<{ orderId: string}>
>("getOrderDetails123/get", async ({ orderId }, thunkAPI) => {
    console.log(orderId)
  try {
    const token = thunkAPI.getState().users.userInfo.token;
    const data = await OrderDetailsService.getOrder(orderId, token);
  
console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    // return thunkAPI.rejectWithValue(error.message);
  }
});

export const OrderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {})
      .addCase(getOrderDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.order = action.payload;
        state.isLoading = false;
        state.isSuccess = true
      })
      .addCase(getOrderDetails.rejected, (state, action: PayloadAction<any>) => {
  
        state.isSuccess = false;
        state.isError = action.payload;
      });
  },
});

export const {} = OrderDetailsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const orderDetailsInfo = (state: RootState) => state.orderDetails;
// export const productDetails = (state: RootState) => state.products.product;

export default OrderDetailsSlice.reducer;
