import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { productsList, IProduct } from "../products";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductItem,
  IInitialState,selectProducts
} from "../features/products/ProductsSlice";
import Loader from "../components/Loader";
import {userLogin} from "../features/users/UsersSlice"
import {postReview,reviewProduct } from "../features/productReview/productReviewSlice"

import Message from "../components/Message";


const ProductScreen: React.FC<IInitialState> = (params) => {




  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { productId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productDetails = useSelector(selectProducts)
  const { isLoading, isError, product } = productDetails

  const userLoginInfo = useSelector(userLogin)
  const { userInfo } = userLoginInfo

  const productReviewCreate = useSelector(reviewProduct)
  const {
    isSuccess: successProductReview,
    isLoading: loadingProductReview,
    isError: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product?._id || product?._id !== productId) {
      // dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      dispatch(getProductItem({ productId }));
        }
  }, [dispatch, productId, successProductReview])

   const addToCartHandler = (): void => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };
const review = {
  rating: +rating,
  comment,
}
  const submitHandler = (e: any) => {
    e.preventDefault()
    dispatch(
      postReview({productId,review} )
    )
  }



  // useEffect(() => {
  //   if (!product?._id || product?._id !== productId) {
  //     dispatch(getProductItem({ productId }));
  //   }
  // }, [dispatch, productId, qty]);

  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <>
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
                    {product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product?.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product?.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
          <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product?.reviews?.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
              {product?.reviews?.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {successProductReview && (
                  <Message variant='success'>
                    Review submitted successfully
                  </Message>
                )}
                {loadingProductReview && <Loader />}
                {errorProductReview && (
                  <Message variant='danger'>{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingProductReview}
                      type='submit'
                      variant='primary'
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to='/login'>sign in</Link> to write a review{' '}
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        </>
      
      )}
    </div>
  );
};

export default ProductScreen;
