import React from "react";
import{useNavigate} from 'react-router-dom'
import { Navbar, Nav, Container } from "react-bootstrap";
function Header() {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Admin-Panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link onClick={()=>{localStorage.clear();navigate('/login')}}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
localStorage.clear()

export default Header;
