import React, { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAuth = () => {
  //receive data from authProvider:
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;
