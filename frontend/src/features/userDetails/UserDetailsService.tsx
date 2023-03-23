import axios from "axios";
const API_URL = "http://localhost:5000";
import { productsList, IProduct } from "../../products";

interface FetchUsertParams {
  email: string;
  password: string;
  name: string
}



const getUserDetail = async (userId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.get(`${API_URL}/api/users/${userId}`,  config)
  return data
};




const UsersService = {
  getUserDetail,

  
  // createAccount,
};

export default UsersService;
