import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "./OrderService";
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
      paidAt?:string,
      user?: string,
      isPaid?: boolean,
      isDelivered?: boolean,
      _id?: string,
    };
 
export interface IInitialOrderState {   
  order: IInitialOrder| null
  success: boolean;
  error: string;
 
}
export type AppThunk<ReturnType = void> = (thunkAPI: ThunkAPI) => ReturnType;


const initialState: IInitialOrderState= {  
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
  AppThunk<{ orderDispatch: IInitialOrder; qty: number }>
>("createOrder/post", async ({ orderDispatch }, thunkAPI) => {
  console.log("orderdispatch",orderDispatch)
  try {
    const token = thunkAPI.getState().users.userInfo.token;
    const data = await OrderService.createOrder(orderDispatch, token);

    return data;
  } catch (error) {

    return thunkAPI.rejectWithValue(error);
  }
});

export const OrderSlice = createSlice({
  name: "order/create",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action.payload)
        state.success = true
        state.order = action.payload;
        

      })
      .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
        

      });
  },
});

export const {} = OrderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrder = (state: RootState) => state.order;
// export const productDetails = (state: RootState) => state.products.product;

export default OrderSlice.reducer;
