import React from "react";
import { LoginForm } from "../components";

function Login(props) {
  const { setLoggedIn, setUserToken, setUserAdmin, setUserId, setGuestId} = props; 
  return (
    <>
      <LoginForm 
        setLoggedIn={setLoggedIn}
        setUserToken={setUserToken}
        setUserAdmin={setUserAdmin}
        setUserId={setUserId}
        setGuestId={setGuestId}
      />
    </>
  );
}

export default Login;
