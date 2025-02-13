import { useState, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("expense");
  const userName = sessionStorage.getItem("user_name");
  useEffect(() => {
    if (location.pathname.includes("/expense-tracker")) {
      setActiveTab("expense");
    } else if (location.pathname.includes("/income-expense-form")) {
      setActiveTab("income");
    } else if (location.pathname.includes("/register-category")) {
      setActiveTab("registerCategory");
    } else if (location.pathname.includes("/manage-category")) {
      setActiveTab("manageCategory");
    } else if (location.pathname.includes("/transaction-statistics-year")) {
      setActiveTab("transactionStatisticYear");
    }
  }, [location.pathname]);

  const handleNavigation = (path, tab) => {
    setActiveTab(tab);
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Xóa sessionStorage khi đăng xuất
    navigate("/login"); // Chuyển hướng về trang login
  };

  return (
    <div className="relative">
      <div className="w-full bg-gray-800 p-4 flex justify-between items-center text-white fixed top-0 left-0 right-0 z-50 flex-grow">
        <div className="max-w-7xl mx-auto w-full flex justify-between">
          <h1 className="text-xl font-bold">Quản Lý Thu Chi</h1>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "expense" ? "bg-blue-600" : "bg-gray-700"
              }`}
              onClick={() => handleNavigation("/expense-tracker", "expense")}
            >
              Lịch sử thu chi
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "income" ? "bg-blue-600" : "bg-gray-700"
              }`}
              onClick={() => handleNavigation("/income-expense-form", "income")}
            >
              Nhập thu chi
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "manageCategory" ? "bg-blue-600" : "bg-gray-700"
              }`}
              onClick={() =>
                handleNavigation("/manage-category", "manageCategory")
              }
            >
              Quản lí danh mục
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "registerCategory" ? "bg-blue-600" : "bg-gray-700"
              }`}
              onClick={() =>
                handleNavigation("/register-category", "registerCategory")
              }
            >
              Tạo danh mục
            </button>

            <button
              className={`px-4 py-2 rounded ${
                activeTab === "transactionStatisticYear"
                  ? "bg-blue-600"
                  : "bg-gray-700"
              }`}
              onClick={() =>
                handleNavigation(
                  "/transaction-statistics-year",
                  "transactionStatisticYear"
                )
              }
            >
              Bảng tổng quan tài chính
            </button>
            <div className="relative group">
              {/* ✅ Avatar & Tài Khoản */}
              <button className="flex items-center gap-2 text-white text-lg cursor-pointer hover:opacity-80 transition-all">
                <FaUserCircle className="text-4xl" />
                <span className="hidden sm:block">{userName}</span>
              </button>

              {/* ✅ Dropdown lệch xuống & bên phải */}
              <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 whitespace-nowrap flex items-center px-4 py-3 border border-gray-700">
                {/* ✅ Icon Đăng Xuất */}
                <FaSignOutAlt className="text-xl text-red-400 mr-2" />
                <button
                  className="hover:text-red-400 transition-all duration-200"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
