/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";


const axiosInstance = axios.create({
  // TODO: change base url
  baseURL: "https://camp-care-server.vercel.app/api/v1",
});
const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      // Add a request interceptor
      axiosInstance.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("access-token");
          if (token) {
            config.headers.authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      // Add a response interceptor
      axiosInstance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          //   console.log("api response error status", error.status);
          if (error.status === 401 || error.status === 403) {
            logOut().then(() => {
              navigate("/login");
            });
          }
          return Promise.reject(error);
        }
      );
    }, []);
    return axiosInstance;
};

export default useAxiosSecure;