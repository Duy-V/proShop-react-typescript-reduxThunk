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
  message: string,
  page:number,
  pages:number
}

const initialState: IInitialState = {
  products:[],
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  page:0,
  pages:0
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
  async ({keyword,pageNumber}, thunkAPI) => {
    console.log(pageNumber)
    try {
      const data:any = await ProductsService.getProducts(keyword,pageNumber);
      return data;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error)
    }
  }
);
// Get one



export const getProductItem = createAsyncThunk<AppThunk<{productId: string }>>(
  "product/get",
  async ({productId}, thunkAPI) => {
    console.log('id', productId);
    try {
      const token = thunkAPI.getState().users.userInfo.token;
      const data = await ProductsService.getProduct(productId, token);
      console.log(data)
      return data;
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
export const updateProduct = createAsyncThunk(
  "update/product",
  async (updateProductData: IProduct, thunkAPI) => {
    // console.log(ticketId)
    try {
      const token = thunkAPI.getState().users.userInfo.token;
      const updateNote = await ProductsService.updateProduct(
        updateProductData,
        token
      );
      thunkAPI.dispatch(getProducts(token));
      return updateNote;
    } catch (error) {
      console.log(error);

      // return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
);

// delte item
export const deleteProduct = createAsyncThunk(
  "delete/product",
  async (id: string, thunkAPI) => {
    console.log("slice", id);
    try {
      const token = thunkAPI.getState().users.userInfo.token;
      const ticket = await ProductsService.deleteProduct(id, token);
      thunkAPI.dispatch(getProductList("",1));
      return ticket;
    } catch (error) {
      console.log(error);

      // return thunkAPI.rejectWithValue(extractErrorMessage(error))
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
    .addCase(getProductList.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getProductList.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.products = action.payload.products
      state.page = action.payload.page
      state.pages = action.payload.pages
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
    .addCase(deleteProduct.pending, (state) => {
      state.isLoading = true
    })
    .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.product = action.payload
      state.isSuccess = true
    })
    .addCase(deleteProduct.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
  },
});



// Other code such as selectors can use the imported `RootState` type
export const selectProducts = (state: RootState) => state.products;
// export const productDetails = (state: RootState) => state.products.product;

export default ProductsSlice.reducer;
