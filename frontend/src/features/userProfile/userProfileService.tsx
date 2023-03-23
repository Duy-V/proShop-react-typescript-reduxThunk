import axios from "axios";
const API_URL = "http://localhost:5000";
import { productsList, IProduct } from "../../products";

interface FetchUsertParams {
  email: string;
  password: string;
  name: string
}





const updateUser = async (account: FetchUsertParams, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${API_URL}/api/users/profile`, {
    email: account.email,
    password: account.password,
    name: account.name,
    _id: account._id
  },config);
  console.log(response)
  return response.data
};

const UsersService = {
  updateUser
  
  // createAccount,
};

export default UsersService;
