import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("expense");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(""); // ✅ Lưu mục active trong dropdown

  const dropdownRef = useRef(null);

  const userName = sessionStorage.getItem("user_name") || "Người dùng";

  useEffect(() => {
    if (location.pathname.includes("/expense-tracker")) {
      setActiveTab("expense");
    } else if (location.pathname.includes("/income-expense-form")) {
      setActiveTab("income");
    } else if (
      location.pathname.includes("/register-category") ||
      location.pathname.includes("/manage-category") ||
      location.pathname.includes("/transaction-statistics-year") ||
      location.pathname.includes("/transaction-category-statistics")
    ) {
      setActiveTab("more");
      setSelectedDropdownItem(location.pathname); // ✅ Giữ trạng thái active mục con
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    setActiveTab("more");
    setSelectedDropdownItem(path); // ✅ Giữ trạng thái active mục con
    navigate(path);
    setIsDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 text-cyan-400 fixed top-0 left-0 right-0 z-50 shadow-md border-b border-cyan-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Quản Lý Thu Chi</h1>

        <nav className="flex items-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "expense"
                ? "bg-cyan-500 text-black shadow-md"
                : "hover:bg-cyan-600"
            }`}
            onClick={() => {
              setActiveTab("expense");
              navigate("/expense-tracker");
            }}
          >
            📜 Lịch sử
          </button>

          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "income"
                ? "bg-cyan-500 text-black shadow-md"
                : "hover:bg-cyan-600"
            }`}
            onClick={() => {
              setActiveTab("income");
              navigate("/income-expense-form");
            }}
          >
            💰 Nhập thu chi
          </button>

          {/* ✅ Dropdown Menu - Giữ trạng thái active mục con */}
          <div className="relative" ref={dropdownRef}>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "more"
                  ? "bg-cyan-500 text-black shadow-md"
                  : "hover:bg-cyan-600"
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onMouseEnter={() => setIsDropdownOpen(true)}
            >
              ➕ Thêm <FaChevronDown />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-56 bg-gray-900 text-cyan-400 rounded-lg shadow-lg border border-cyan-500"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className={`block w-full px-5 py-3 text-left transition-all ${
                    selectedDropdownItem === "/manage-category"
                      ? "bg-cyan-500 text-black"
                      : "hover:bg-cyan-600 hover:text-black"
                  }`}
                  onClick={() => handleNavigation("/manage-category")}
                >
                  📂 Quản lí danh mục
                </button>
                <button
                  className={`block w-full px-5 py-3 text-left transition-all ${
                    selectedDropdownItem === "/register-category"
                      ? "bg-cyan-500 text-black"
                      : "hover:bg-cyan-600 hover:text-black"
                  }`}
                  onClick={() => handleNavigation("/register-category")}
                >
                  📌 Tạo danh mục
                </button>
                <button
                  className={`block w-full px-5 py-3 text-left transition-all ${
                    selectedDropdownItem === "/transaction-statistics-year"
                      ? "bg-cyan-500 text-black"
                      : "hover:bg-cyan-600 hover:text-black"
                  }`}
                  onClick={() =>
                    handleNavigation("/transaction-statistics-year")
                  }
                >
                  📊 Tổng quan tài chính
                </button>
                <button
                  className={`block w-full px-5 py-3 text-left transition-all ${
                    selectedDropdownItem === "/transaction-category-statistics"
                      ? "bg-cyan-500 text-black"
                      : "hover:bg-cyan-600 hover:text-black"
                  }`}
                  onClick={() =>
                    handleNavigation("/transaction-category-statistics")
                  }
                >
                  📑 Thống kê danh mục
                </button>
              </div>
            )}
          </div>

          {/* User Profile & Logout */}
          <div className="relative">
            <button
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            >
              <FaUserCircle className="text-3xl" />
              <span className="hidden sm:block font-medium">{userName}</span>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-cyan-400 rounded-lg shadow-lg border border-cyan-500">
                <button
                  className="flex items-center px-5 py-3 w-full text-left hover:bg-red-600 hover:text-black transition-all"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="text-red-400 mr-2" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
