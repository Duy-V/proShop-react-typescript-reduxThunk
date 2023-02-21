import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./bootstrap.min .css"
import './index.css'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ErrorPage from "./ErrorPage";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/jquery/dist/jquery.slim.min.js";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
// import "../node_modules/popper.js/dist/umd/popper.min.js";
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
      { path: "/product/:id", element: <ProductScreen /> },

      // {
      //   path: "/list-products",
      //   element: <ListProducts />,
      //   children: [],
      // },

      // {
      //   path: "/cart-page",
      //   element: <CartPage />,
      // }
    ],
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <RouterProvider router={router} />

)
