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
    _id: string
  };



const putDeliveryOrder = async ( order:IInitialOrder, token: string) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

  const { data } = await axios.put(`${API_URL}${order._id}/deliver`, order.shippingAddress,config)
  
  return data;

};


const OrderDeliveryService = {
 putDeliveryOrder

};

export default OrderDeliveryService;
