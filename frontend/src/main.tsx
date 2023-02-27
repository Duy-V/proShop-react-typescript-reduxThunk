import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./bootstrap.min .css"
import './index.css'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

// import Product from "./components/Product"
import ErrorPage from "./ErrorPage";
import{Provider} from 'react-redux'
import {store} from './store'
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
      { path: "/product/:productId", element: <ProductScreen /> , 
    },
    { path: "/cart/:productId?", element: <CartScreen /> , 
  
  },


    ],
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<Provider store={store}>

  <RouterProvider router={router} />
</Provider>

)
