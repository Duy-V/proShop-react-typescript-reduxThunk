import axios from "axios";
const API_URL = "http://localhost:5000/api/users";

interface userUpdate {
  name: string;
  email: string;
  _id: string,
  isAdmin: boolean
}
const updateUser = async (account: userUpdate,token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${API_URL}/${account._id}`, {
    name: account.name,
    email: account.email,
    _id: account._id,
    isAdmin: account.isAdmin
  }, config);

  return response.data
};




const UserUpdateService = {
  updateUser
};

export default UserUpdateService;
