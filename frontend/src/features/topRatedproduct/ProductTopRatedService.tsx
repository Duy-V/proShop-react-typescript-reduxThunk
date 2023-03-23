import axios from "axios";
const API_URL = "http://localhost:5000/api/products/";
import { productsList, IProduct } from "../../products";


const getTopProducts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}top`,config);
  return response
};







const ProductTopRatedService = {
    getTopProducts
};

export default ProductTopRatedService;
