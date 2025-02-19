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
      <div className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] p-4 flex justify-between items-center text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide drop-shadow-md">Quản Lý Thu Chi</h1>
          <div className="flex gap-6">
            {[
              { label: "Lịch sử thu chi", path: "/expense-tracker", key: "expense" },
              { label: "Nhập thu chi", path: "/income-expense-form", key: "income" },
              { label: "Quản lí danh mục", path: "/manage-category", key: "manageCategory" },
              { label: "Tạo danh mục", path: "/register-category", key: "registerCategory" },
              { label: "Bảng tổng quan tài chính", path: "/transaction-statistics-year", key: "transactionStatisticYear" },
            ].map(({ label, path, key }) => (
              <button
                key={key}
                className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === key ? "bg-white text-blue-700 shadow-md" : "bg-blue-500 hover:bg-blue-400"
                }`}
                onClick={() => handleNavigation(path, key)}
              >
                {label}
              </button>
            ))}
  
            <div className="relative group">
              <button className="flex items-center gap-2 text-lg cursor-pointer hover:opacity-80 transition-all">
                <FaUserCircle className="text-4xl drop-shadow-md" />
                <span className="hidden sm:block">{userName}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 whitespace-nowrap">
                <button
                  className="flex items-center px-5 py-3 w-full text-left hover:bg-red-100 transition-all duration-200 rounded-lg"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="text-red-500 mr-2" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}  

export default Header;
