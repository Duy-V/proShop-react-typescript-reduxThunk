import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addItemToCart, removeFromCart } from "../features/cart/CartSlice";
import {
  getProductItem,
  IInitialState,
} from "../features/products/ProductsSlice";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { selectCartItems } from "../features/cart/CartSlice";
import { userLogin } from "../features/users/UsersSlice";

const CartScreen: React.FC<IInitialState> = () => {
  let { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  let qty = +searchParams.get("qty");
  const cartItems = useSelector(selectCartItems).cartItems;
 console.log(cartItems)
  const loginSuccess = useSelector(userLogin).userInfo;

  useEffect(() => {
    if (productId) {
      dispatch(addItemToCart({ productId, qty }));
    }
  }, [dispatch]);

  // const handleChangeQty = (itemId: string, qtyOfItem: string) => {
  //   dispatch(addItemToCart( itemId,qtyOfItem ));
  // };
  const removeFromCartHandler = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };
  const checkoutHandler = () => {
    if (loginSuccess) {
      navigate("/shipping");
    }
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems?.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems?.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item?.qty}
                      // onChange={() =>
                      // dispatch(
                      //   addToCart(item.product, Number(e.target.value))
                      // )
                      // handleChangeQty(item?._id, e.target.value)
                      // }
                    >
                      {[...Array(item?.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems?.reduce((acc, item) => acc + parseInt(item?.qty), 0)})
                items
              </h2>
              $
              {cartItems?.reduce(
                  (acc, item) => acc + parseInt(item?.qty) * item.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems?.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
