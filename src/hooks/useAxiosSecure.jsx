import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://tree-plant-api-assign.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      // console.log(config);
      const token = user?.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => res,
      (err) => {
        // console.log(err);
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          // console.log("log out the user for the bad request");
          logOut().then(() => {
            navigate("/register");
          });
        }
        return Promise.reject(err); // forward the error ----->to calling code........
      }
    );

    // interceptors  deactivate hobe kaj ses hole
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return instance;
};

export default useAxiosSecure;
