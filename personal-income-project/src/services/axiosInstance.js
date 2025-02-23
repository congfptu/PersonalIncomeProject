import axios from "axios";

// Lấy token từ sessionStorage
const getToken = () => sessionStorage.getItem("access_token");

// Tạo Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Thêm Interceptor để tự động gắn token vào header
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

// Hàm đăng xuất và chuyển hướng về trang login
const logoutAndRedirect = () => {
  sessionStorage.removeItem("access_token");
  window.location.replace("/login"); // Dùng replace để không quay lại trang trước khi đăng xuất
};

// Xử lý khi token hết hạn (401 Unauthorized)
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
