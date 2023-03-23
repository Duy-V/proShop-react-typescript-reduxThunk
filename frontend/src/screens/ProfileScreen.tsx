import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {  loginAccount, userLogin } from '../features/users/UsersSlice'
import {getDetailUserInfo,userDetailsInfo } from '../features/userDetails/UserDetailsSlice'
import { updateUserProfile, userUpdateProfile, resetUpdateUser } from '../features/userProfile/userProfileSlice'
import { useParams, useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const accountLogin = useSelector(userLogin)
  const { userInfo } = accountLogin
  console.log(userInfo)
  const user = useSelector(userUpdateProfile)
  const { isLoading, isError, userUpdate, isSuccess } = user
  const [name, setName] = useState(userInfo?.name)
  const [email, setEmail] = useState(userInfo?.email)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch()
 

 

  
  const userDetailsInfor = useSelector(userDetailsInfo)
  const { userDetails } =  userDetailsInfor
  // const orderListMy = useSelector(orderListMy)
  // const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !userUpdate.name || isSuccess) {
        if (!user || !userUpdate.name ) {
        dispatch(resetUpdateUser())
        dispatch(getDetailUserInfo(userInfo?._id))
        // dispatch(listMyOrders())
        }
      } else {
        setName(userUpdate.name)
        setEmail(userUpdate.email)
      }
    }
  }, [dispatch, navigate, userInfo, userUpdate])

  const submitHandler = (e: any) => {
    e.preventDefault()
    if (password !== confirmPassword) { 
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id:userInfo._id, name, email, password }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {/* {isSuccess && <Message variant='success'>Profile Updated</Message>} */}
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant='danger'>{isError}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {/* {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )} */}
      </Col>
    </Row>
  )
}

export default ProfileScreen
