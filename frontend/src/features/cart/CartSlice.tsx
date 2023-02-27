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
export interface IInitialState  {
  products: IProduct[],
  product: IProduct| null,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: string
}

const initialState: IInitialState = {
  products:[],
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}
type Dispatch = /*unresolved*/ any
interface ThunkAPI {
  dispatch: Dispatch;
  getState: () => RootState;
}

export type AppThunk<ReturnType = void> = (
  thunkAPI: ThunkAPI
) => ReturnType;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjFmMDY5ZGEwYTVkMTQ1YzcwZjAyMiIsImlhdCI6MTY3NzA0OTc5MSwiZXhwIjoxNjc5NjQxNzkxfQ.s76EoM9oatj1L_IUIEI5Yge1PKo37yzz935Jx1PHsaY";


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



export const addItemToCart = createAsyncThunk<AppThunk<{productId: string,qty: number } >>(
  "selectedProduct/get",
  async ({productId, qty}, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      const data= await CartService.addToCart(productId, token);
     const  selectedTicket= {...data, qty}
   localStorage.setItem('cartItems', JSON.stringify(selectedTicket))

      return selectedTicket;
    } catch (error) {
console.log(error)
      // return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  

  },
  extraReducers: (builder) => {
    builder
    .addCase(addItemToCart.pending, (state) => {
      state.isLoading = true
    })
    .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.products = action.payload

    })
    // .addCase(addItemToCart.rejected, (state, action: PayloadAction<any>) => {
    //   state.isLoading = false
    //   state.isError = true
    //   state.message = action.payload
    // })
   
  },
});

export const {
  // addToCart,
  // deleteProduct,
  // updateProduct,

  
} = CartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const cartItems = (state: RootState) => state.products;
// export const productDetails = (state: RootState) => state.products.product;

export default CartSlice.reducer;
