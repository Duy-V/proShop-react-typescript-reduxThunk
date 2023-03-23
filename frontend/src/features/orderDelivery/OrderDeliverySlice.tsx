import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderDeliveryService from "./OrderDeliveryService";
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

export const putDeliveryOrder = createAsyncThunk<
  AppThunk<{ order: IInitialOrder}>
>("putOrderDelivery/put", async ({ order }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().users.userInfo.token;
    const data = await OrderDeliveryService.putDeliveryOrder(order, token);
  
console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    // return thunkAPI.rejectWithValue(error.message);
  }
});

export const OrderDeliverySlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    orderDeliverReset: (state) =>{}
  },
  extraReducers: (builder) => {
    builder
      .addCase(putDeliveryOrder.pending, (state) => {})
      .addCase(putDeliveryOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.order = action.payload;
        state.isLoading = false;
        state.isSuccess = true
      })
      .addCase(putDeliveryOrder.rejected, (state, action: PayloadAction<any>) => {
  
        state.isSuccess = false;
        state.isError = action.payload;
      });
  },
});

export const {orderDeliverReset} = OrderDeliverySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const orderDeliveryInfo = (state: RootState) => state.orderDelivery;
// export const productDetails = (state: RootState) => state.products.product;

export default OrderDeliverySlice.reducer;
