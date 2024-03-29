import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { selectCartItems } from "../features/cart/CartSlice";
import { createOrder, selectOrder } from "../features/order/OrderSlice";
import { IProduct, productsList } from "../products";
import { useParams, useNavigate } from "react-router-dom";
import {
  userLogin
} from "../features/users/UsersSlice";
export interface IOrderItem {
  image: string,
  name: string,
  price: number,
  qty:  number,
  product: {
      _id: string
  }
}
const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const userInfo = useSelector(userLogin).userInfo
  let cart = useSelector(selectCartItems);
let newCart = cart.cartItems.map(item=>({...item, product: {_id: item._id}}))
console.log(newCart)
  if (!cart?.shippingAddress?.address) {
    navigate("/shipping");
  } else if (!cart?.paymentMethod) {
    navigate("/payment");
  }
  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
let x=addDecimals(
  cart?.cartItems?.reduce((acc: number, item: IProduct) => acc + item.price * (+item?.qty), 0)
);
console.log(x)
  cart =  {...cart, itemsPrice: +x}
  if(cart.itemsPrice) {
    cart.shippingPrice = +addDecimals(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = addDecimals(Number((0.15 * cart?.itemsPrice).toFixed(2)));
    cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
    ).toFixed(2);
  }
  

  const orderCreate = useSelector(selectOrder);
  let { order, success, error} = orderCreate;
  console.log(order)
  const orderDispatch = {orderItems: newCart,
  shippingAddress: cart.shippingAddress,
  paymentMethod: cart.paymentMethod,
  itemsPrice: cart.itemsPrice,
  shippingPrice: cart.shippingPrice,
  taxPrice: cart.taxPrice,
  totalPrice: cart.totalPrice,
  paidAt:"",
  user: userInfo.email,
  isPaid: false,
  isDelivered: false }
 

  useEffect(() => {
    console.log('remote to order pay',success)

    if (success) {
    // console.log('remote to order pay', order?._id)

      navigate(`/order/${order?._id}`)
      console.log('remote to order pay')
      // dispatch({ type: USER_DETAILS_RESET })
      // dispatch({ type: ORDER_CREATE_RESET })
  }
    // eslint-disable-next-line
  }, [navigate, success,order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({orderDispatch})
    );
  };

  return (
    <>
      <CheckoutSteps step1="step1" step2="step2" step3="step3" step4="step4" />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart?.shippingAddress?.address}, {cart?.shippingAddress?.city}{" "}
                {cart?.shippingAddress?.postalCode},{" "}
                {cart?.shippingAddress?.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item?.product?._id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${(parseInt(item?.qty)) * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart?.cartItems?.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
