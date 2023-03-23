import axios from "axios";
const API_URL = "http://localhost:5000/";

interface FetchUsertParams {
  email: string;
  password: string;
  name?: string
}

const getUsers = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
console.log('service', token)
  const { data } = await axios.get(`${API_URL}api/users`,  config)
  console.log(data)
  return data
};
const deleteUser = async (userId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.delete(`${API_URL}api/users/${userId}`,  config)
  return data
};
// const updateUser = async (account, token: string) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const { data } = await axios.post(`${API_URL}/api/users/${account}`,  config)
//   return data
// };

const UserAdminService = {
  getUsers,
  deleteUser,
  // updateUser

};

export default UserAdminService;
