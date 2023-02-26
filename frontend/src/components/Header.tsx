import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
function Header() {
  return (
    

    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">       
        <Navbar.Brand href="#home"> Pro-shop</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>CART
          
          </Link>
          <Link to="/login">
          
            <i className="fas fa-user"></i>Login
          </Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
