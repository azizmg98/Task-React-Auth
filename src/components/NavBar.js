import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import authStore from "../stores/authStore";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";
import { observer } from "mobx-react";
import SignoutButton from "./SignoutButton";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/products">
          <Navbar.Brand>Chicken Shop</Navbar.Brand>
        </Link>
        <Nav>
          {authStore.user ? (
            <>
              <p style={{ color: "white", paddingTop:25 }}>
                Welcome {authStore.user.username}
              </p>
              <SignoutButton />
            </>
          ) : (
            <>
              <SignupModal />
              <SigninModal />
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default observer(NavBar);
