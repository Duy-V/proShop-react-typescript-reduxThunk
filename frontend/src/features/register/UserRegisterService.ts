import axios from "axios";
const API_URL = "http://localhost:5000/api/users";
import { productsList, IProduct } from "../../products";

interface userRegister {
  name: string;
  email: string;
  password: string;
}
const createNewUser = async (account: userRegister) => {
  const response = await axios.post(API_URL, {
    name: account.name,
    email: account.email,
    password: account.password,
  });

  return response.data
};




const UsersService = {
    createNewUser
};

export default UsersService;
