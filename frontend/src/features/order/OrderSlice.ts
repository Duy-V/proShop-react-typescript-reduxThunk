import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "./OrderService";
import { AppDispatch } from "../../store";
// import { extractErrorMessage } from '../../utils'

// Define a type for the slice state
interface FetchProductParams {
  productId: string;
}
export interface IInitialOrder {  
  
      orderItems: IProduct[] | [];
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
    };
  
export interface IInitialOrderState {   
  order: IInitialOrder| null
  success: boolean;
  error: string;
}
export type AppThunk<ReturnType = void> = (thunkAPI: ThunkAPI) => ReturnType;

// export const cartItemsFromStorage: IProduct[] = localStorage.getItem(
//   "cartItems"
// )
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];
const initialState: IInitialOrderState = {  
  order: null,
  success: false,
  error: "",
};
type Dispatch = /*unresolved*/ any;
interface ThunkAPI {
  dispatch: Dispatch;
  getState: () => RootState;
}

export const createOrder = createAsyncThunk<
  AppThunk<{ order: IInitialOrder; qty: number }>
>("createOrder/post", async ({ order }, thunkAPI) => {
    console.log(order)
  try {
    const token = thunkAPI.getState().users.userInfo.token;
    const data = await OrderService.createOrder(order, token);
    localStorage.removeItem("cartItems");
console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    // return thunkAPI.rejectWithValue(error.message);
  }
});

export const OrderSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {})
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {});
  },
});

export const {} = OrderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrder = (state: RootState) => state.order;
// export const productDetails = (state: RootState) => state.products.product;

export default OrderSlice.reducer;
