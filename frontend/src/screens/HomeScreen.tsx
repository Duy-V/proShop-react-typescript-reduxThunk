import {Col, Row} from "react-bootstrap"
import {IProduct, productsList} from "../products"
import Product from "../components/Product"
import { selectProducts } from "../features/products/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react'
import {getProductList,IInitialState} from '../features/products/ProductsSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen: React.FC<IInitialState> = (params)=> {
  // const [productsListHome, setProductsListHome] = useState<IProduct[]>(productsList)
  const productsListHome = useSelector(selectProducts);
const {isError, isLoading, products, message } = productsListHome
  const dispatch = useDispatch<any>();
useEffect(()=>{
  dispatch(getProductList())
},[dispatch])
  return (
    <div>
     <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{message}</Message>
      ) : (
      <Row>
   
        {  products?.map((item: IProduct, index) => {
              return(  <Col key={index} sm={12} md={6} lg={4} xl={3}>
                    <Product product={item}/>
                </Col>)
            })
        }
      </Row>
    //    <Paginate
    //    pages={pages}
    //    page={page}
    //    keyword={keyword ? keyword : ''}
    //  />
     )}
    </div>
  )
}
export default  HomeScreen;