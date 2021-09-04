import { Navbar, Nav, Image } from "react-bootstrap";
import logo from "../background/logo.png";
import "./MainNavBar.css";
import { helpHttp } from "../helpers/helpHttp";
import { urls } from "../helpers/config";
const MainNavBar = ({ authentication }) => {
  const handlelog = async () => {
    await helpHttp()
      .post(urls.url_signout, {
        body: { email: JSON.parse(localStorage.getItem("user")).email },
        headers: {
          "content-type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("user")).token,
        },
      })
      .then((res) => {
        if (res.message) {
          localStorage.removeItem("user");
          authentication(false);
        }
      });
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <a href="#/">DebateYa!</a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <a href="#/dashboard">Dashboard</a>
          <a href="#/profile">Profile</a>
          <a href="#/" onClick={handlelog}>
            Log out
          </a>
        </Nav>
        <Nav>
          <Image className="Logo" src={logo} rounded />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavBar;
