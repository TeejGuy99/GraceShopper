import React from "react";
import { RegisterForm } from "../components";

function Register(props) {
  const { setLoggedIn, setUserToken } = props; 
  return (
    <>
      <div>Register</div>
      <RegisterForm 
        setLoggedIn={setLoggedIn}
        setUserToken={setUserToken}
      />
    </>
  );
}

export default Register;
