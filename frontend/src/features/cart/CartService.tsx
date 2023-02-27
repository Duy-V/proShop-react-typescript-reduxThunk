import axios from "axios";
const API_URL = "http://localhost:5000/api/products/";
import { productsList, IProduct } from "../../products";


interface FetchProductParams {
  productId: number;
}
const addToCart = async (productId: IProduct, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}${productId}`, config);
  return response.data;

};

// Get user tickets
// const getCart = async (token: string) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.get(API_URL, config);

//   return response.data;
// };

// const getItemCart = async (productId: string, token: string) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   console.log(API_URL);
//   const response = await axios.get(`${API_URL}${productId}`, config);

//   return response.data;
// };

// const deleteItemCart = async (productId: string, token: string) => {
//   console.log(productId, "service");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.delete(`${API_URL}${productId}`, config);
//   return response.data;
// };

//ticket.product, ticket.product, ticket._id



//  // Close ticket
// const closeTicket = async (ticketId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.put(
//     API_URL + ticketId,
//     { status: 'closed' },
//     config
//   )

//   return response.data
// }
const ProductsService = {
  addToCart,
  // getCart,
  // getItemCart,
  // // closeProduct,
  // deleteItemCart,
};

export default ProductsService;
