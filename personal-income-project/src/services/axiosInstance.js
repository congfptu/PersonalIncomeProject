import axios from "axios";

const getToken = () => sessionStorage.getItem("access_token");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && typeof token === "string") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const logoutAndRedirect = () => {
  sessionStorage.removeItem("access_token");
  window.location.replace("/login");
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Token hết hạn, đăng xuất và chuyển hướng...");
      logoutAndRedirect();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
