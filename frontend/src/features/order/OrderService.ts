import axios from "axios";
const API_URL = "http://localhost:5000/api/orders/";
import { productsList, IProduct } from "../../products";


interface FetchProductParams {
  productId: number;
}
export interface IInitialOrder {  
  
    orderItems: IProduct[] | [];
    shippingAddress: {
      address: string;
      city: string;
      postalCode: string;
      country: string;
    } | null;
    paymentMethod: string | null;
    itemsPrice: number | null;
    shippingPrice: number | null;
    taxPrice: number | null;
    totalPrice: number | null;
  };



const createOrder = async (order: IInitialOrder, token: string) => {
    console.log(order)
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

  const { data } = await axios.post(`${API_URL}`, order, config)
  
  return data;

};


const OrderService = {
  createOrder,
  // getCart,
  // getItemCart,
  // // closeProduct,
  // deleteItemCart,
};

export default OrderService;
