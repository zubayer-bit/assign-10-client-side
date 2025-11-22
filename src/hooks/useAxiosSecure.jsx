import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
      console.log(config);
      const token = user?.accessToken; // safer: optional chaining
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor (added new features)
    const responseInterceptor = instance.interceptors.response.use(
      (res) => res,
      (err) => {
        console.log(err);
        const status = err.response?.status; // safer: use err.response
        if (status === 401 || status === 403) {
          console.log("log out the user for the bad request");
          logOut().then(() => {
            navigate("/register");
          });
        }
        return Promise.reject(err); // NEW: forward the error to calling code
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor); // NEW: remove response interceptor
    };
  }, [user, logOut, navigate]);

  return instance;
};

export default useAxiosSecure;
