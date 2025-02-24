import React, { useEffect, useState } from "react";
import { message, notification } from "antd";
import Header from "./Header.jsx";
import { getCategory } from "../services/categoryServices";
import { createTransaction } from "../services/transactionService.js";
import Footer from "./Footer.jsx";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  BankOutlined,
  GiftOutlined,
  CoffeeOutlined,
  HomeOutlined,
  TrophyOutlined,
  RocketOutlined,
  PhoneOutlined,
  HeartOutlined,
  CameraOutlined,
  BulbOutlined,
  ToolOutlined,
  DesktopOutlined,
  ReadOutlined,
  ShoppingOutlined,
  MedicineBoxOutlined,
  WalletOutlined,
  PieChartOutlined,
  TrophyFilled,
  CarFilled,
  BankFilled,
  GiftFilled,
  HomeFilled,
} from "@ant-design/icons";

const iconMap = {
  DollarCircleOutlined: <DollarCircleOutlined />,
  ShoppingCartOutlined: <ShoppingCartOutlined />,
  CarOutlined: <CarOutlined />,
  BankOutlined: <BankOutlined />,
  GiftOutlined: <GiftOutlined />,
  HomeOutlined: <HomeOutlined />,
  TrophyOutlined: <TrophyOutlined />,
  RocketOutlined: <RocketOutlined />,
  MedicineBoxOutlined: <MedicineBoxOutlined />,
  DesktopOutlined: <DesktopOutlined />,
  CameraOutlined: <CameraOutlined />,
  BulbOutlined: <BulbOutlined />,
  WalletOutlined: <WalletOutlined />,
  PieChartOutlined: <PieChartOutlined />,
  TrophyFilled: <TrophyFilled />,
  CarFilled: <CarFilled />,
  BankFilled: <BankFilled />,
  GiftFilled: <GiftFilled />,
  HomeFilled: <HomeFilled />,
  PhoneOutlined: <PhoneOutlined />,
  HeartOutlined: <HeartOutlined />,
  ReadOutlined: <ReadOutlined />,
  ShoppingOutlined: <ShoppingOutlined />,
  CoffeeOutlined: <CoffeeOutlined />,
  ToolOutlined: <ToolOutlined />,
};

export default function IncomeExpenseForm() {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isIncome, setIsIncome] = useState(true);
  const resetForm = () => {
    setSelectedCategory(null);
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const result = await getCategory();
        setIncomeCategories(
          result.data.dataList?.[0]?.listCategoryCollect || []
        );
        setExpenseCategories(
          result.data.dataList?.[0]?.listCategorySpend || []
        );
      } catch (error) {
        console.error("Lỗi khi lấy danh mục", error);
        message.error("Lỗi khi tải danh mục, vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const categories = isIncome ? incomeCategories : expenseCategories;

  const handleSubmit = async () => {
    if (!selectedCategory) {
      message.warning("Vui lòng chọn danh mục!");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      message.warning("Số tiền phải lớn hơn 0!");
      return;
    }
    const numericAmount = parseInt(amount.replace(/\./g, ""), 10);
    const transactionData = {
      categoryId: selectedCategory,
      transactionType: isIncome ? 1 : 0,
      amount: parseFloat(numericAmount),
      description,
      date: `${date}T00:00:00.000Z`,
    };

    try {
      await createTransaction(transactionData);
      notification.success({
        message: "Thành công!",
        description: `Doanh thu đã được add thành công.`,
        placement: "topRight",
        duration: 3,
      });
      setSelectedCategory(null);
      setAmount("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Lỗi khi thêm giao dịch", error);
      message.error("Lỗi khi thêm giao dịch, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen flex-grow">
      <Header className="relative z-10" />
      <div className="w-screen flex flex-grow justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black mt-40 pt-20 pb-20">
        <div className="w-[1000px] min-h-[750px] p-8 bg-gray-900 text-white rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {isIncome ? "Nhập Khoản Thu" : "Nhập Khoản Chi"}
          </h2>

          <div className="flex w-full mb-4">
            <button
              className={`flex-1 p-3 rounded-l-lg border border-gray-700 ${
                isIncome ? "bg-green-600" : "bg-gray-800"
              }`}
              onClick={() => {
                setIsIncome(true);
                resetForm();
              }}
            >
              Thu nhập
            </button>
            <button
              className={`flex-1 p-3 rounded-r-lg border border-gray-700 ${
                !isIncome ? "bg-red-600" : "bg-gray-800"
              }`}
              onClick={() => {
                setIsIncome(false);
                resetForm();
              }}
            >
              Chi tiêu
            </button>
          </div>

          <label className="block w-full mb-2">Ngày:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-800 rounded border border-gray-700"
          />

          <label className="block w-full mb-2">Ghi chú:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập ghi chú"
            className="w-full p-3 mb-4 bg-gray-800 rounded border border-gray-700"
          />

          <label className="block w-full mb-2">Số tiền:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              setAmount(value ? parseInt(value).toLocaleString("vi-VN") : "");
            }}
            className="w-full p-3 mb-4 bg-gray-800 rounded border border-gray-700"
          />

          <label className="block w-full mb-2">Danh mục:</label>
          <div className="grid grid-cols-5 gap-4 mb-12 w-full auto-rows-fr">
            {loading ? (
              <p className="text-center w-full">Đang tải danh mục...</p>
            ) : categories.length > 0 ? (
              categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`p-3 w-full h-[50px] rounded-lg border border-gray-700 flex flex-col justify-center items-center transition-all ${
                    selectedCategory === cat.id
                      ? isIncome
                        ? "bg-gray-500"
                        : "bg-gray-500"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span
                    className="text-lg"
                    style={{ color: cat.color || "#ffffff" }}
                  >
                    {iconMap[cat.icon] || "📁"}
                  </span>

                  <span className="text-sm text-white">{cat.name}</span>
                </button>
              ))
            ) : (
              <p className="text-center w-full">Không có danh mục</p>
            )}
          </div>

          <button
            className="w-full p-4 bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {isIncome ? "Nhập khoản thu" : "Nhập khoản chi"}
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
