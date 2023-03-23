import axios from "axios";
const API_URL = "http://localhost:5000/api/products";
import { productsList, IProduct } from "../../products";

interface FetchProductParams {
  productId: number;
}
 interface IReview {
    rating: number;
    comment:string;
    name: string;
    _id: string;
    createdAt: string
 }



//ticket.product, ticket.product, ticket._id

const postReview = async (productId: string,review:  IReview, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/${productId}/reviews`,
   review,
    config
  );
  return response.data;
};

const ProductReviewService = {
    postReview
};

export default ProductReviewService;
