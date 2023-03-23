import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductTopRatedService from "./ProductTopRatedService";
import { AppDispatch } from "../../store";
// import { extractErrorMessage } from '../../utils'

// Define a type for the slice state
interface FetchProductParams {
  productId: string;
}
export interface IInitialState  {
  products: IProduct[],
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: string,

}

const initialState: IInitialState = {
  products:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

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
export const getTopProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.userInfo.token;
      const data = await ProductTopRatedService.getTopProducts(token);
      return data;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error)
    }
  }
);


export const ProductsSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(getTopProducts.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getTopProducts.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.products = action.payload.products

    })
    .addCase(getTopProducts.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  },
});



// Other code such as selectors can use the imported `RootState` type
export const topRatedProducts = (state: RootState) => state.productTopRated;
// export const productDetails = (state: RootState) => state.products.product;

export default ProductsSlice.reducer;
