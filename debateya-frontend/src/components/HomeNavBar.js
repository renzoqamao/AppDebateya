import { Navbar, Nav, Image } from "react-bootstrap";
import logo from "../background/logo.png";
import "./HomeNavBar.css";
const HomeNavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>DebateYa!</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <a href="#/signin">Sign in</a>
          <a href="#/signup">Sign up</a>
        </Nav>
        <Nav>
          <Image className="Logo" src={logo} rounded />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HomeNavBar;
