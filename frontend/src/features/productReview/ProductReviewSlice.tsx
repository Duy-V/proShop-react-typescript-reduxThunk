import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductReviewService from "./ProductReviewService";
import { AppDispatch } from "../../store";
// import { extractErrorMessage } from '../../utils'

// Define a type for the slice state
interface FetchProductParams {
  productId: string;
}
export interface IInitialState  {
message: string;
isLoading: boolean
}

const initialState: IInitialState = {
message: "",
isLoading: false
}
interface IReview {
    rating: number;
    comment:string;
    name: string;
    _id: string;
    createdAt: string
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
export const postReview = createAsyncThunk<
AppThunk<{ productId: string; review: IReview}>
>(
  "productReview/post",
  async ({productId, review}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.userInfo.token;

      const data:any = await ProductReviewService.postReview(productId, review, token);
      return data;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error)
    }
  }
);
// Get one





export const ProductReviewSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(postReview.pending, (state) => {
      state.isLoading = true
    })
    .addCase(postReview.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.message = action.payload.message

    })
    .addCase(postReview.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
    //   state.isError = true
      state.message = action.payload
    })
  
  },
});



// Other code such as selectors can use the imported `RootState` type
export const reviewProduct = (state: RootState) => state.productReview;
// export const productDetails = (state: RootState) => state.products.product;

export default ProductReviewSlice.reducer;
