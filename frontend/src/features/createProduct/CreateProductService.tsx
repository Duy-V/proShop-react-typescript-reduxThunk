import axios from "axios";
const API_URL = "http://localhost:5000/api/products";
import { productsList, IProduct } from "../../products";

interface FetchProductParams {
  productId: number;
}
const createProduct = async (productData: IProduct, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}`, productData, config);
  return response
};




//ticket.product, ticket.product, ticket._id

const updateProduct = async (updateProductData: IProduct, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/${updateProductData._id}/`,
    {
      name: updateProductData.name,
      price: updateProductData.price,
      image: updateProductData.image,
      brand: updateProductData.brand,
      category: updateProductData.category,
      countInStock: updateProductData.countInStock,
      numReviews: updateProductData.numReviews,
      description: updateProductData.description,
    },
    config
  );
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
const CreateProductService = {
  createProduct,
 
  // closeProduct,
  updateProduct,

};

export default CreateProductService;
