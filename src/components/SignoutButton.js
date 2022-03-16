import React from "react";
import { Button } from "react-bootstrap";
import authStore from "../stores/authStore";

function SignoutButton() {
  const handleClick = (e) => {
    authStore.signout();
  };
  // calling signout inside onClick causes problems
  return (
    <Button variant="outline-light mx-3" onClick={handleClick}>
      Signout
    </Button>
  );
}

export default SignoutButton;
