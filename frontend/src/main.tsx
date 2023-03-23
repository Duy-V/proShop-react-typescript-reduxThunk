import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./bootstrap.min .css";
import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ErrorPage from "./ErrorPage";
import { Provider } from "react-redux";
import { store } from "./store";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import UserListScreen from "./screens/UserListScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      { path: "/product/:productId", element: <ProductScreen /> },
      { path: "/register", element: <RegisterScreen /> },
      { path: "/cart/:productId?", element: <CartScreen /> },
      { path: "/shipping", element: <ShippingScreen /> },
      { path: "/profile", element: <ProfileScreen /> },
      { path: "/admin/userlist", element: <UserListScreen /> },
      { path: "/login", element: <LoginScreen /> },
      { path: "/payment", element: <PaymentScreen /> },
      { path: "/placeorder", element: <PlaceOrderScreen /> },
      { path: '/order/:id', element: <OrderScreen /> },
      { path: '/admin/orderlist', element: <OrderListScreen /> },
      { path: '/admin/user/:id/edit', element: <UserEditScreen /> },
      { path: '/admin/productlist/:pageNumber', element: <ProductListScreen /> },
      { path: '/admin/product/:id/edit', element: <ProductEditScreen /> },
      { path: '/admin/productlist', element: <ProductListScreen /> },
      {path:'/search/:keyword', element:<HomeScreen />},
      { path:'/page/:pageNumber', element:<HomeScreen/>},
      {path:'/search/:keyword/page/:pageNumber',element: <HomeScreen/>}

       
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
