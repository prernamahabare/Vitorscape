import React from "react";
import { Route, Redirect } from "react-router";
//import { useAuth } from "../Contexts/Authcontext";

export default function PrivateRoute({ component: Component, ...rest }) {
  let token = JSON.parse(localStorage.getItem("token"));

  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
}
