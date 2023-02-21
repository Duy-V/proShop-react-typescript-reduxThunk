import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { productsList, IProduct } from "../products";
import { useParams } from "react-router-dom";
const ProductScreen: React.FC<IProduct[]> = (products) => {
  const { id } = useParams();
  const [productsListHome, setProductsListHome] =
    useState<IProduct[]>(productsList);

  const product = productsListHome.find((p) => p._id == id);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
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
                {product?.countInStock >0 ? 'Instock': "Out Stock"}</Col>
            </Row>
          </ListGroup.Item>
      <ListGroup.Item><Button className="btn-block" disabled={product?.countInStock==0} type="button">Add to Cart</Button></ListGroup.Item>
          </ListGroup>
        </Col>
      
         
      </Row>
    </div>
  );
};

export default ProductScreen;
