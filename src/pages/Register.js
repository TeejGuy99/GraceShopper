import React from "react";
import { RegisterForm } from "../components";

function Register(props) {
  const { setLoggedIn, setUserToken, setGuestId, setUserId } = props;
  return (
    <>
      <div>Register</div>
      <RegisterForm setLoggedIn={setLoggedIn} setUserToken={setUserToken} setGuestId={setGuestId} setUserId={setUserId} />
    </>
  );
}

export default Register;
