import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
function Header() {
  return (
    

    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">       
        <Navbar.Brand href="#home"> Pro-shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <LinkContainer to="/cart">
            <Nav.Link><i className="fas fa-shopping-cart"></i>CART</Nav.Link>
          
          </LinkContainer>
          <LinkContainer to="/login">
          
            <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
          </LinkContainer>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
