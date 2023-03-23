import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {userLogin} from "../features/users/UsersSlice"
import {getOrderDetails,orderDetailsInfo,IOrderItem} from "../features/orderDetails/orderDetailsSlice"
import {orderPay,payOrder,orderPayRest} from "../features/orderPay/orderPaySlice"
import {orderDeliveryInfo, putDeliveryOrder,orderDeliverReset} from "../features/orderDelivery/OrderDeliverySlice"
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
export interface IPaymentResultDispatch {
  id: string,
  status: string,
  update_time: string,
  email_address: string,
  payer?: {
    email_address: string,
  } 
}
export interface IPaymentResult {
  id: string,
  status: string,
  update_time: string,
  email_address?: string,
 
}
const OrderScreen = () => {
    const orderId = useParams().id
    console.log(orderId)
    const navigation = useNavigate();
    const [sdkReady, setSdkReady] = useState(false)
  
    const dispatch = useDispatch()
  
    const orderDetailsInformation = useSelector(orderDetailsInfo)
    const { order, isLoading, isError } = orderDetailsInformation
    console.log(order)
    const orderPayInfo = useSelector(orderPay)
    const { isLoading: loadingPay, isSuccess: successPay } = orderPayInfo
  
    const orderDeliver = useSelector(orderDeliveryInfo)
    const { isLoading: loadingDeliver, isSuccess: successDeliver } = orderDeliver
  
    const accountLogin = useSelector(userLogin)
    const { userInfo } = accountLogin
  
    if (!isLoading) {
      //   Calculate prices
      const addDecimals = (num:number) => {
        return Number((Math.round(num * 100) / 100).toFixed(2))
      }
  
      // order?.itemsPrice = addDecimals(
      //   order?.orderItems?.reduce((acc: number, item: IOrderItem) => acc + (+item?.qty)*item?.price , 0)
      // )
     
     
    }
    const clientId = "AUWeBdX51bD3kkdTMuSeOl-RM4FCZWlYj-v5C-6DjESgCzGSy8L_sAMA6j8YgstOKjNNFTbX7zbVK1tv"
    useEffect(() => {
      if (!userInfo) {
        navigation('/login')
      }
  
      const addPayPalScript = async () => {
        // const { data: clientId } = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
  
      if (!order ) {
        // dispatch(orderPayRest())
        // dispatch(orderDeliverReset())
        dispatch(getOrderDetails({orderId}))
      }
       else if (!order.isPaid) {
        if (!window?.paypal) {
          addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }
    }, [dispatch, orderId,successPay, successDeliver, order])
    const successPaymentHandler = (paymentResult:IPaymentResultDispatch) => {
console.log(paymentResult)
      const paymentResultDispatch:IPaymentResult = {
        ...paymentResult, email_address: paymentResult?.payer?.email_address,
      }
      // console.log(paymentResult,paymentResultDispatch)
      dispatch(payOrder({orderId, paymentResultDispatch}))
    }
  
    const deliverHandler = () => {
      dispatch(putDeliveryOrder({order}))
    }

    return isLoading ? (
      <Loader />
    ) : isError ? (
      <Message variant='danger'>{isError}</Message>
    ) : (
      <>
        <h1>Order {order?._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order?.user?.name}
                </p>
                <p>
                  <strong>Email: </strong>{' '}
                  <a href={`mailto:${order?.user?.email}`}>{order?.user?.email}</a>
                </p>
                <p>
                  <strong>Address:</strong>
                  {order?.shippingAddress?.address}, {order?.shippingAddress?.city}
                  {order?.shippingAddress?.postalCode}
                  {order?.shippingAddress?.country}
                </p>
                {order?.isDelivered ? (
                  <Message variant='success'>
                    Delivered on {order?.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </ListGroup.Item>
  
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order?.paymentMethod}
                </p>
                {order?.isPaid ? (
                  <Message variant='success'>Paid on {order?.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </ListGroup.Item>
  
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order?.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order?.orderItems.map((item, index) => (
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
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
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
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order?.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order?.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order?.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order?.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order?.isPaid && (
                  <ListGroup.Item>
                    {/* {loadingPay && <Loader />} */}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order?.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
                {/* {loadingDeliver && <Loader />} */}
                {userInfo &&
                  userInfo.isAdmin &&
                  order?.isPaid &&
                  !order?.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn btn-block'
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  }

export default OrderScreen
