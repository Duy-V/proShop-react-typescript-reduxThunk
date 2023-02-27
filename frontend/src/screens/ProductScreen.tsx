import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { productsList, IProduct } from "../products";
import { useParams, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from "../features/products/ProductsSlice";
import {getProductItem,IInitialState} from '../features/products/ProductsSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen: React.FC<IInitialState> = (params)=> {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { productId } = useParams();
  const navigate = useNavigate();
  const productList = useSelector(selectProducts)
 
  const {isError, isLoading, product, message } = productList
  const dispatch = useDispatch()
 
  useEffect(() => {
 
    if (!product?._id || product?._id !== productId) {
      dispatch(getProductItem({productId}))
     
    }
  }, [dispatch])
const addToCartHandler = (): void => {
  
  navigate(`/cart/${productId}?qty=${qty}`);
}
  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
      <Row>
        <Col md={6}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
          <ListGroup.Item>Price: ${product?.description}</ListGroup.Item>
          <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
      <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product?.countInStock === 0}
                    >
                      Add To Cart 
                    </Button>
                  </ListGroup.Item>
          </ListGroup>
        </Col>
      
         
      </Row>
      )
      }
    </div>
  );
};

export default ProductScreen;
