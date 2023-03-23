import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IProduct, productsList } from "../../products";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductsService from "../products/ProductsService";
import CreateProductService from "./CreateProductService";
import { AppDispatch } from "../../store";

// import { extractErrorMessage } from '../../utils'

// Define a type for the slice state
interface FetchProductParams {
  productId: string;
}
export interface IInitialState  {
  product: IProduct| null,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
}

const initialState: IInitialState = {
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
}
type Dispatch = /*unresolved*/ any
interface ThunkAPI {
  dispatch: Dispatch;
  getState: () => RootState;
}

export type AppThunk<ReturnType = void> = (
  thunkAPI: ThunkAPI
) => ReturnType;

  //post item
export const createProduct =createAsyncThunk(
  "CreateProducts/create",
  async (productData: IProduct, thunkAPI) => {
    try {
        const token = thunkAPI.getState().users.userInfo.token;
      const data = await  CreateProductService.createProduct(productData, token);
      thunkAPI.dispatch(getProductList("", 1));

      return data
    } catch (error) {
      console.log(error);
    //   return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
);

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

export const CreateProductSlice = createSlice({
  name: "CreateProducts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    productCreateReset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.product = action.payload
      state.isSuccess= true
    })
    .addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess= false

    })
    // .addCase(getProductItem.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(getProductItem.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.isLoading = false
    //   state.product = action.payload
    // })
    // .addCase(getProductItem.rejected, (state, action: PayloadAction<any>) => {
    //   state.isLoading = false
    //   state.isError = true
    //   state.message = action.payload
    // })
  },
});

export const { productCreateReset } = CreateProductSlice.actions;


// Other code such as selectors can use the imported `RootState` type
export const createNewProduct = (state: RootState) => state.products;
// export const productDetails = (state: RootState) => state.products.product;

export default CreateProductSlice.reducer;
