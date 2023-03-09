import axios from "axios";
const API_URL = "http://localhost:5000/api/users/login";
import { productsList, IProduct } from "../../products";

interface FetchUsertParams {
  email: string;
  password: string;
}
const login = async (account: FetchUsertParams) => {
  const response = await axios.post(API_URL, {
    email: account.email,
    password: account.password,
  });
  console.log(response)
  return response.data
};




const UsersService = {
  login,
  
  // createAccount,
};

export default UsersService;
