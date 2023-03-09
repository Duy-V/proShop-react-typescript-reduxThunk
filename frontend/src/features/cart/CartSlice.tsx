import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "./CartService";
import { AppDispatch } from "../../store";
// import { extractErrorMessage } from '../../utils'

// Define a type for the slice state
interface FetchProductParams {
  productId: string;
}
export interface IInitialState {
  cartItems: IProduct[] | [];
  product: IProduct | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  } | null;
  paymentMethod: string | null,
  itemsPrice: number |null,
  shippingPrice: number |null,
  taxPrice: number |null,
  totalPrice:number |null
}
export type AppThunk<ReturnType = void> = (thunkAPI: ThunkAPI) => ReturnType;

export const cartItemsFromStorage: IProduct[] = localStorage.getItem(
  "cartItems") ? JSON.parse(localStorage.getItem("cartItems")): [];
const initialState: IInitialState = {
  cartItems: cartItemsFromStorage || [],
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  shippingAddress: null,
  paymentMethod:null,
  itemsPrice: null,
  shippingPrice: null,
  taxPrice: null,
  totalPrice:null
};
type Dispatch = /*unresolved*/ any;
interface ThunkAPI {
  dispatch: Dispatch;
  getState: () => RootState;
}

//getall
// export const getCartList = createAsyncThunk(
//   "products/getAll",
//   async (_, thunkAPI) => {
//     try {
//       // const token = thunkAPI.getState().auth.user.token;
//       const data = await CartService.getCart(token);
//       console.log(data)
//       return data.products;
//     } catch (error) {
//       console.log(error);
//       // return thunkAPI.rejectWithValue(error.message)
//     }
//   }
// );
// Get one

export const addItemToCart = createAsyncThunk<
  AppThunk<{ productId: string; qty: number }>
>("addItemToCart/get", async ({ productId, qty }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().users.userInfo.token;
    const data = await CartService.addToCart(productId, token);
    const selectedItem = { ...data, qty };
    let newState= thunkAPI.getState().cart
    console.log(newState);
    console.log(newState.cartItems)
    const existItem = newState.cartItems?.find((x: any) => x._id === selectedItem?._id);
    console.log(existItem);
    if (existItem) {
      newState = {
        ...newState,
        cartItems: newState?.cartItems.map((x: any) =>
          x._id === existItem._id ? selectedItem : x
        ),
      };
    console.log(111,newState );
    } else {
      
      newState = {
        ...newState,
        cartItems: [...(newState.cartItems|| []), selectedItem]
      };     
    console.log(newState);
    }
    localStorage.setItem('cartItems',JSON.stringify(newState.cartItems))
    // console.log(newState);
    return newState.cartItems;
  } catch (error) {
    console.log(error);
    // return thunkAPI.rejectWithValue(error.message);
  }
});

//   //post item
// export const createProduct =createAppAsyncThunk(
//   //?? 'auth/register' string này có ý nghĩa gì
//   "products/create",
//   async (productData: IProduct, thunkAPI) => {
//     try {
//       // const token = thunkAPI.getState().auth.user.token
//       return await CartService.createProduct(productData, token);
//     } catch (error) {
//       console.log(error);

//       // return thunkAPI.rejectWithValue(extractErrorMessage(error))
//     }
//   }
// );

// //put item
// export const updateProduct = createAppAsyncThunk(
//   "tickets/update",
//   async (updateProductData: IProduct, thunkAPI) => {
//     // console.log(ticketId)
//     try {
//       // const token: string = thunkAPI.getState().auth.user.token;
//       const updateNote = await ProductsService.updateProduct(
//         updateProductData,
//         token
//       );
//       thunkAPI.dispatch(getProducts(token));
//       return updateNote;
//     } catch (error) {
//       console.log(error);

//       // return thunkAPI.rejectWithValue(extractErrorMessage(error))
//     }
//   }
// );

//delte item
// export const deleteProduct = createAsyncThunk(
//   "tickets/delete",
//   async (productData, thunkAPI) => {
//     console.log("slice", productData._id);
//     try {
//       // const token = thunkAPI.getState().auth.user.token;
//       const ticket = await ProductsService.deleteTicket(productData._id, token);
//       thunkAPI.dispatch(getProducts(token));
//       return ticket;
//     } catch (error) {
//       console.log(error);

//       // return thunkAPI.rejectWithValue(extractErrorMessage(error))
//     }
//   }
// );

export const CartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeFromCart: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      const foundPostIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === cartItemId
      );
      if (foundPostIndex !== -1) {
        state.cartItems.splice(foundPostIndex, 1);
      }
    },
    saveShippingAddress: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      state.shippingAddress = action.payload
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
    },
    savePaymentMethod: (state, action: PayloadAction<string>) =>{
      console.log(action.payload)
      state.paymentMethod = action.payload
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload))
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      
        state.cartItems = action.payload;
      });
  },
});

export const { removeFromCart, saveShippingAddress, savePaymentMethod } = CartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cart;
// export const productDetails = (state: RootState) => state.products.product;

export default CartSlice.reducer;
