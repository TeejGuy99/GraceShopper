import React from "react";
import { LoginForm } from "../components";

function Login(props) {
  const { setLoggedIn, setUserToken, setUserAdmin} = props; 
  return (
    <>
      <LoginForm 
        setLoggedIn={setLoggedIn}
        setUserToken={setUserToken}
        setUserAdmin={setUserAdmin}
      />
    </>
  );
}

export default Login;
