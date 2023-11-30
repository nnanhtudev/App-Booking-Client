import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

instance.defaults.withCredentials = true;
// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // Log the outgoing request for debugging
    // console.log("Outgoing Request:", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (error && error.response && error.response.status) || 500;
    switch (status) {
      // authentication (token related issues)
      case 401: {
        // toast.error("Unauthorized the user. Please login ...");
        return error.response.data;
      }
      // forbidden (permission related issues)
      case 403: {
        // toast.error("Your don't have the  permission to access this resource");
        return error.response.data;
      }

      // bad request
      case 400: {
        return error.response.data;
      }

      // not found
      case 404: {
        return error.response.data;
      }

      // conflict
      case 409: {
        return error.response.data;
      }

      // unprocessable
      case 422: {
        return error.response.data;
      }
      // generic api error (server related) unexpected
      default: {
        return error.response.data;
      }
    }
  }
);

export default instance;
