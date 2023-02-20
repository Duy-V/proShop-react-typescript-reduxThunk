import {Col, Row} from "react-bootstrap"
import {useState} from 'react'
import {IProduct, productsList} from "../products"
// interface Props {
//   results: IProduct[];
// }
const HomeScreen: React.FC<IProduct[]> = (params)=> {
  const [productsListHome, setProductsListHome] = useState<IProduct[]>(productsList)
  console.log(productsListHome,productsList)
  return (
    <div>
      <h1>Lastest Product</h1>
      <Row>
        {/* {productsListHome} */}
        {   productsListHome?.map((item: IProduct) => {
                <Col sm={12} md={6} lg={4} xl={3}>
                    <h3>{item.name}</h3>
                </Col>
            })
        }
      </Row>
    </div>
  )
}
export default  HomeScreen;