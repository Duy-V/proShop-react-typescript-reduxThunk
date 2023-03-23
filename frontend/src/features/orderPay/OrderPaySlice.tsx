import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderPayService from "./OrderPayService";
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
      paidAt:string,
      user: string,
      isPaid: false,
      isDelivered: false ,
      _id?: string,
    };
  
export interface IInitialOrderPay {   
orderPay: IInitialOrder| null
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean
}
export type AppThunk<ReturnType = void> = (thunkAPI: ThunkAPI) => ReturnType;


const initialState: IInitialOrderPay= {
  orderPay: null,
  isSuccess: false,
  isError: false,
  isLoading: true
}
type Dispatch = /*unresolved*/ any;
interface ThunkAPI {
  dispatch: Dispatch;
  getState: () => RootState;
}
interface payment {
  id: string,
  status: string,
  update_time: string,
  email_address?: string,
}
export const payOrder = createAsyncThunk<
  AppThunk<{ orderId: string; paymentResultDispatch: payment}>
>("createPayOrder/put", async ({orderId, paymentResultDispatch},thunkAPI) => {
  console.log("orderPaysSlice",orderId, paymentResultDispatch)
  try {
    const token = thunkAPI.getState().users.userInfo.token;
    const data = await OrderPayService.putOrderPay(orderId,paymentResultDispatch,token);
console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    // return thunkAPI.rejectWithValue(error.message);
  }
});

export const OrderPaySlice = createSlice({
  name: "orderPay",
  initialState,
  reducers: {
    orderPayRest: () =>{}
  },
  extraReducers: (builder) => {
    builder
      .addCase(payOrder.pending, (state) => {

      })
      .addCase(payOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.orderPay = action.payload;
        state.isSuccess = true
        state.isError = false
        state.isLoading = true
      })
      .addCase(payOrder.rejected, (state, action: PayloadAction<any>) => {
        state.isSuccess = false
        state.isError = true
        state.isLoading = false
      });
  },
});

export const {orderPayRest} = OrderPaySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const orderPay = (state: RootState) => state.orderPay;
// export const productDetails = (state: RootState) => state.products.product;

export default OrderPaySlice.reducer;
