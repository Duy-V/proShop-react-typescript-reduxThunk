import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {userLogin} from "../features/users/UsersSlice"
import {selectProducts,getProductList} from "../features/products/ProductsSlice"
import {createNewProduct,createProduct,productCreateReset} from "../features/createProduct/CreateProductSlice"
import {deleteProduct} from "../features/products/ProductsSlice"
import { useParams, useNavigate,useLocation } from "react-router-dom";

const ProductListScreen = () => {
  // const paramsId = parseInt(useParams().pageNumber)
  const pageNumber = useParams().pageNumber || 1
  console.log(pageNumber)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productList = useSelector(selectProducts)
  const { isLoading, isError, products, page, pages } = productList
  const productDeleteInfo = useSelector(selectProducts)
  const {
    isLoading: loadingDelete,
    isError: errorDelete,
    isSuccess: successDelete,
  } = productDeleteInfo

  const productCreate = useSelector(createNewProduct)
  const {
    isLoading: loadingCreate,
    isError: errorCreate,
    isSuccess: successCreate,
    product: createdProduct,
  } = productCreate

  const userLoginInfo = useSelector(userLogin)
  const { userInfo } = userLoginInfo

  useEffect(() => {
    dispatch(productCreateReset())

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(getProductList({pageNumber}))
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    console.log("create Product")
    dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {/* {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{isError}</Message>
      ) : ( 
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true}  />
        </>
       )} 
    </>
  )
}

export default ProductListScreen
