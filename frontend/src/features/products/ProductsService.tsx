import axios from "axios";
const API_URL = "http://localhost:5000/api/products/";
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
  const response = await axios.post(API_URL, productData, config);
};

// Get user tickets
const getProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const getProduct = async (productId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(API_URL);
  const response = await axios.get(`${API_URL}${productId}`, config);

  return response.data;
};

const deleteProduct = async (productId: string, token: string) => {
  console.log(productId, "service");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${productId}`, config);
  return response.data;
};

//ticket.product, ticket.product, ticket._id

const updateProduct = async (updateProductData: IProduct, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}${updateProductData._id}/`,
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
const ProductsService = {
  createProduct,
  getProducts,
  getProduct,
  // closeProduct,
  updateProduct,
  deleteProduct,
};

export default ProductsService;
