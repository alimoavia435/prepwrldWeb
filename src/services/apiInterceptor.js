import axios from "axios";

const api = axios.create();

if (typeof window !== "undefined") {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      const tokendev = localStorage.getItem("tokendev");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else if (tokendev) {
        config.headers.Authorization = `Bearer ${tokendev}`;
      }


      else {
        console.warn("Token not found in localStorage");
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        console.error("Unauthorized or Forbidden request - Token issue");
        // You can handle redirect logic here, e.g., redirect to login
        // window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
}

export default api;
