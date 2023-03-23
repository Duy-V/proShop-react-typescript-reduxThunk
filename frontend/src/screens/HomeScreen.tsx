import {Col, Row} from "react-bootstrap"
import {IProduct, productsList} from "../products"
import Product from "../components/Product"
import { selectProducts } from "../features/products/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react'
import {getProductList,IInitialState} from '../features/products/ProductsSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { useParams, useNavigate,useLocation} from "react-router-dom";
import { Link } from 'react-router-dom'

const HomeScreen: React.FC<IInitialState> = (params)=> {
  // const [productsListHome, setProductsListHome] = useState<IProduct[]>(productsList)
  const productsListHome = useSelector(selectProducts);
const {isError, isLoading, products, message, page, pages } = productsListHome
  const dispatch = useDispatch();

  const keyword = useParams().keyword || '';

  const pageNumber = useParams().pageNumber || 1
  console.log(keyword, pageNumber)
  
  useEffect(()=>{
  dispatch(getProductList({keyword, pageNumber}))
},[dispatch, keyword, pageNumber])






  return (
    <>
      {/* <Meta /> */}
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{isError}</Message>
      ) : (
        <>
         <Row>
             {  products?.map((item: IProduct, index) => {
         return(  <Col key={index} sm={12} md={6} lg={4} xl={3}>
               <Product product={item}/>
           </Col>)
       })
   }
 </Row>
  <Paginate
  pages={pages}
  page={page}
  keyword={keyword ? keyword : ''}
/>
        </>
   )}
   </>
 )
}
export default  HomeScreen;