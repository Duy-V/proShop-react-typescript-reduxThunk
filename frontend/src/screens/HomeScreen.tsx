import {Col, Row} from "react-bootstrap"
import {useState} from 'react'
import {IProduct, productsList} from "../products"
import Product from "../components/Product"
const HomeScreen: React.FC<IProduct[]> = (params)=> {
  const [productsListHome, setProductsListHome] = useState<IProduct[]>(productsList)
  
  return (
    <div>
      <h1>Lastest Product</h1>
      <Row>
        {/* {productsListHome} */}
        {   productsListHome?.map((item: IProduct, index) => {
              return(  <Col key={index} sm={12} md={6} lg={4} xl={3}>
                    <Product product={item}/>
                </Col>)
            })
        }
      </Row>
    </div>
  )
}
export default  HomeScreen;