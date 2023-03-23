import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import usersReducer from "./features/users/UsersSlice";
import productsReducer from "./features/products/ProductsSlice";
import cartReducer from "./features/cart/CartSlice";
import orderReducer from "./features/order/OrderSlice";
import userDetailsReducer from "./features/userDetails/userDetailsSlice";
import userRegisterReducer from "./features/register/UserRegisterSlice";
import UserProfileReducer from "./features/userProfile/UserProfileSlice";
import UserAdminReducer from "./features/userAdmin/UserAdminSlice";
import OrderDetailsReducer from "./features/orderDetails/OrderDetailsSlice";
import OrderPayReducer from "./features/orderPay/OrderPaySlice";
import OrderListReducer from "./features/orderList/OrderListSlice";
import UserUpdateReducer from "./features/userUpdate/UserUpdateSlice";
import CreateProductReducer from "./features/createProduct/CreateProductSlice";
import OrderDeliveryReducer from "./features/orderDelivery/OrderDeliverySlice";
import ProductReviewReducer from "./features/productReview/ProductReviewSlice";
import ProductTopRatedReducer from "./features/topRatedProduct/ProductTopRatedSlice";

// import { IProduct, productsList } from "./products";

// load string from localStarage and convert into an Object
// invalid output must be undefined

export const store = configureStore({
  reducer: {
    users: usersReducer,
    userDetails: userDetailsReducer,
    userProfile: UserProfileReducer,
    userAdmin: UserAdminReducer,
    products: productsReducer,
    createProduct: CreateProductReducer,
    cart: cartReducer,
    order: orderReducer,
    userRegister: userRegisterReducer,
    userUpdate: UserUpdateReducer,
    orderDetails: OrderDetailsReducer,
    orderPay: OrderPayReducer,
    orderList: OrderListReducer,
    orderDelivery: OrderDeliveryReducer,
productReview: ProductReviewReducer,
productTopRated: ProductTopRatedReducer
  },
  // loadFromLocalStorage()
});

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
