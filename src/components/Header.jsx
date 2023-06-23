import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import './App.css';
import {motion} from 'framer-motion';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="info" variant="warning">
      <Container>
        <Navbar.Brand href="#home" variant="light" className="icon">
          <Link to="/" style={{textDecoration:"none", color: "#404040"}}>
            <motion.div
            whileHover={{
              scale: 1.2
            }}
            whileTap={{
              scale: 0.9
            }}
            >
                DSA
            </motion.div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Conversion" id="collasible-nav-dropdown" classname="navItem">
              <NavDropdown.Item>
                <Link to='/infix-to-postfix' style={{textDecoration:"none", color: "black"}}>
                  Infix To Postfix
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to='/infix-to-prefix' style={{textDecoration:"none", color: "black"}}>
                  Infix To Prefix
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Evaluation" id="collasible-nav-dropdown" classname="navItem">
            <NavDropdown.Item>
              <Link to="/postfix-evaluation" style={{textDecoration:"none", color: "black"}}>
                Postfix Evaluation
              </Link>
            </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="prefix-evaluation" style={{textDecoration:"none", color: "black"}}>
                  Prefix Evaluation
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              <Link to="/tower-of-hanoi" style={{textDecoration:"none", color: "black"}}>
                Tower Of Hanoi
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;