import React from "react";
import { LoginForm } from "../components";

function Login(props) {
  const {
    setLoggedIn,
    setUserToken,
    setUserAdmin,
    setUserId,
    setGuestId,
    isUserAdmin,
  } = props;

  return (
    <>
      <LoginForm
        setLoggedIn={setLoggedIn}
        setUserToken={setUserToken}
        setUserAdmin={setUserAdmin}
        setUserId={setUserId}
        setGuestId={setGuestId}
        isUserAdmin={isUserAdmin}
      />
    </>
  );
}

export default Login;
