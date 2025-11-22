import React, { use } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import PageLoad from "../PageLoad/PageLoad";

const PrivateRoute = ({ children }) => {
  //receive value from authProvider:
  const { user, loading } = use(AuthContext);

  //location ar state keo send korte hobe login page:
  const location = useLocation();

  //jokhon "user" ar value thakbe na tokhon loding active thakbe kaj korbe
  if (loading) {
    return <PageLoad></PageLoad>;
  }

  //jodi user ar value thake tahole je page aa jaoar kotha oi page jabe:
  if (user && user?.email) {
    //ai children ar moddhe je page aa jabo oi page ar component set kora ace "main.jsx" ar moddhe
    return children;
  }

  //rr jodi "user" ar value na thake tahole "return" hoa jabe "login" page aa

  return <Navigate to={'/login'} state={{from:location}} replace></Navigate>;
};

export default PrivateRoute;
