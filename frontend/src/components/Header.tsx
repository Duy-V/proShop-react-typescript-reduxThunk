import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux'
// import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
import {
  userLogin,
  UsersState,
  loginAccount,
  logoutAccount
} from "../features/users/UsersSlice";
function Header() {
  const dispatch = useDispatch()

  const accountLogin = useSelector(userLogin)
  const { userInfo } = accountLogin

  const logoutHandler = () => {
    console.log('out account')
    dispatch(logoutAccount())
  }
  return (
   

    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
    <Container>
      <LinkContainer to='/'>
        <Navbar.Brand>ProShop</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
        <Nav className='ml-auto'>
          <LinkContainer to='/cart'>
            <Nav.Link>
              <i className='fas fa-shopping-cart'></i> Cart
            </Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to='/login'>
              <Nav.Link>
                <i className='fas fa-user'></i> Sign In
              </Nav.Link>
            </LinkContainer>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin' id='adminmenu'>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderlist'>
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
