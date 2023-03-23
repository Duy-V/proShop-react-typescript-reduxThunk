import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {userDetailsInfo,getDetailUserInfo} from "../features/userDetails/UserDetailsSlice"
import {userUpdateInfo,updateUser,userUpdateReset} from "../features/userUpdate/UserUpdateSlice"

const UserEditScreen = () => {
  const navigate = useNavigate()
  const userId = useParams().id
console.log(userId)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetailsInformation = useSelector(userDetailsInfo)
  const { isLoading, isError, userDetails } = userDetailsInformation

  const userUpdate = useSelector(userUpdateInfo)
  const {
    isLoading: loadingUpdate,
    isError: errorUpdate,
    isSuccess: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (userUpdate.isSuccess) {    
      navigate('/admin/userlist')  
      dispatch(userUpdateReset())
     
    } else {
      if (!userDetails.name || userDetails._id !== userId) {
        dispatch(getDetailUserInfo(userId))
      } else {
        setName(userDetails.name)
        setEmail(userDetails.email)
        setIsAdmin(userDetails.isAdmin)
      }
    }
  }, [dispatch,  userId, userDetails])
// const account = { _id: userId, name, email, isAdmin }
  const submitHandler = (e: any) => {
    e.preventDefault()
   dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
