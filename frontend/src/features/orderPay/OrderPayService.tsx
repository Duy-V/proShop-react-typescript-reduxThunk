import axios from "axios";
const API_URL = "http://localhost:5000/api/orders/";
import { productsList, IProduct } from "../../products";


interface FetchProductParams {
  productId: number;
}
interface payment {
  id: string,
  status: string,
  update_time: string,
  email_address: string,
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
    _id: string | null
  };



const putOrderPay = async ( orderId: string,  paymentResultDispatch: payment,token: string) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
  console.log("orderPaysService111",orderId, paymentResultDispatch)

  const { data } = await axios.put(
    `${API_URL}${orderId}/pay`,
    paymentResultDispatch,
    config
  )
  console.log(data.payer)
  return data.payer;

};


const OrderPayService = {
  putOrderPay,
};

export default OrderPayService;
