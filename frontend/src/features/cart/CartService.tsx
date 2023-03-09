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
