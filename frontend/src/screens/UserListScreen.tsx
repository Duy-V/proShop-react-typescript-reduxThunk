import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAccounts, deleteAccount,userAdmin } from '../features/userAdmin/UserAdminSlice'
import { useParams, useNavigate,useLocation } from "react-router-dom";
import {userLogin} from "../features/users/UsersSlice"
export interface userInfo {
  _id: string;
  name: string;
  token: string;
  isAdmin: boolean;
  email: string;
}
const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const usersListInfo = useSelector(userAdmin)
  const { isLoading, isError, userList } = usersListInfo
  console.log("list_user", userList)
  const accountLogin = useSelector(userLogin)
  const { userInfo } = accountLogin
console.log(userInfo.isAdmin)
  // const userDelete = useSelector(userDelete) 
  // const { isSuccess } = userDelete

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(getAccounts())
      console.log("load data list")
    } else { 
      navigate('/login')
    }
 
  }, [dispatch, userInfo])

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteAccount(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{ isError}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user: userInfo) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )} 
    </>
  )
}

export default UserListScreen
