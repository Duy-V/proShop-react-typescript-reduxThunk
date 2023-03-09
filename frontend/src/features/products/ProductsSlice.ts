import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductsService from "./ProductsService";
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


//getall
export const getProductList = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.userInfo.token
      const data = await ProductsService.getProducts(token);
      return data.products;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error)
    }
  }
);
// Get one



export const getProductItem = createAsyncThunk<AppThunk<{productId: string }>>(
  "product/get",
  async ({productId}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.userInfo.token;
      const selectedTicket = await ProductsService.getProduct(productId, token);
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
//       return await ProductsService.createProduct(productData, token);
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

export const ProductsSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProductList.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getProductList.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
      state.isLoading = false
      state.products = action.payload
    })
    .addCase(getProductList.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(getProductItem.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getProductItem.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.product = action.payload
    })
    .addCase(getProductItem.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  },
});

export const {
  // createProduct,
  // deleteProduct,
  // updateProduct,

  
} = ProductsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProducts = (state: RootState) => state.products;
// export const productDetails = (state: RootState) => state.products.product;

export default ProductsSlice.reducer;
