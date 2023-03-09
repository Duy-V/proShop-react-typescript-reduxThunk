import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import usersReducer from "./features/users/UsersSlice"
import productsReducer from "./features/products/ProductsSlice"
import cartReducer from "./features/cart/CartSlice"
import orderReducer from "./features/order/OrderSlice"

// import userRegisterReducer from "./features/register/UserRegisterSlice"
import { IProduct, productsList } from "./products";



// load string from localStarage and convert into an Object
// invalid output must be undefined

export const store = configureStore({
  reducer: {
    users: usersReducer ,
products: productsReducer,
cart: cartReducer,
order: orderReducer
// userRegister: userRegisterReducer,
},
// loadFromLocalStorage()

})

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch