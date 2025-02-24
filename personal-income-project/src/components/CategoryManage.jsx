import React, { useEffect, useState } from "react";
import {
  Typography,
  Spin,
  Modal,
  Input,
  Button,
  message,
  notification,
  Popconfirm,
} from "antd";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {
  getCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryServices";
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

const { Title } = Typography;

const CategoryList = () => {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("income");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reload, setReload] = useState(false);
  const incomeIcons = {
    DollarCircleOutlined: <DollarCircleOutlined />,
    BankOutlined: <BankOutlined />,
    GiftOutlined: <GiftOutlined />,
    TrophyOutlined: <TrophyOutlined />,
    PieChartOutlined: <PieChartOutlined />,
    WalletOutlined: <WalletOutlined />,
    RocketOutlined: <RocketOutlined />,
    HomeOutlined: <HomeOutlined />,
    CarOutlined: <CarOutlined />,
    HeartOutlined: <HeartOutlined />,
    ReadOutlined: <ReadOutlined />,
    DesktopOutlined: <DesktopOutlined />,
    CameraOutlined: <CameraOutlined />,
    BulbOutlined: <BulbOutlined />,
    ToolOutlined: <ToolOutlined />,
    CoffeeOutlined: <CoffeeOutlined />,
    ShoppingOutlined: <ShoppingOutlined />,
    BankFilled: <BankFilled />,
    TrophyFilled: <TrophyFilled />,
    CarFilled: <CarFilled />,
  };

  const expenseIcons = {
    ShoppingCartOutlined: <ShoppingCartOutlined />,
    PhoneOutlined: <PhoneOutlined />,
    MedicineBoxOutlined: <MedicineBoxOutlined />,
    GiftFilled: <GiftFilled />,
    CarOutlined: <CarOutlined />,
    BankOutlined: <BankOutlined />,
    TrophyOutlined: <TrophyOutlined />,
    HomeFilled: <HomeFilled />,
    ShoppingOutlined: <ShoppingOutlined />,
    CoffeeOutlined: <CoffeeOutlined />,
    BulbOutlined: <BulbOutlined />,
    ToolOutlined: <ToolOutlined />,
    DesktopOutlined: <DesktopOutlined />,
    ReadOutlined: <ReadOutlined />,
    RocketOutlined: <RocketOutlined />,
    WalletOutlined: <WalletOutlined />,
    PieChartOutlined: <PieChartOutlined />,
    BankFilled: <BankFilled />,
    TrophyFilled: <TrophyFilled />,
    CarFilled: <CarFilled />,
  };
  const colorGrid = [
    ["#FFEB3B", "#FFF9C4", "#FFD54F", "#FFC107", "#FF9800", "#FF6F00"],

    ["#FFCDD2", "#FF5722", "#F44336", "#C62828", "#AD1457", "#F06292"],

    ["#F8BBD0", "#E91E63", "#9C27B0", "#BA68C8", "#E1BEE7", "#673AB7"],

    ["#BBDEFB", "#64B5F6", "#2196F3", "#0D47A1", "#283593", "#D1C4E9"],
    ["#C8E6C9", "#81C784", "#4CAF50", "#1B5E20", "#A1887F", "#FF9800"],

    ["#6A1B9A", "#424242", "#0D47A1"],
  ];

  const colorOptions = [
    "#FFEB3B",
    "#FFCDD2",
    "#F8BBD0",
    "#E1BEE7",
    "#BBDEFB",
    "#C8E6C9",
    "#FFF9C4",
    "#D1C4E9",
    "#FFC107",
    "#FF5722",
    "#E91E63",
    "#9C27B0",
    "#2196F3",
    "#4CAF50",
    "#FFEB3B",
    "#673AB7",
    "#F44336",
    "#F06292",
    "#BA68C8",
    "#64B5F6",
    "#81C784",
    "#FFD54F",
    "#A1887F",
    "#FF9800",
    "#C62828",
    "#AD1457",
    "#6A1B9A",
    "#283593",
    "#1B5E20",
    "#FF6F00",
    "#424242",
    "#0D47A1",
  ];
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const result = await getCategory();
        setIncomeCategories(result.data.dataList[0].listCategoryCollect || []);
        setExpenseCategories(result.data.dataList[0].listCategorySpend || []);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [reload]);

  const handleOpenModal = (category) => {
    setSelectedCategory({ ...category });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setReload((prev) => !prev);
  };

  const handleSave = async () => {
    if (!selectedCategory.name.trim()) {
      message.error("Tên danh mục không được để trống!");
      return;
    }

    setIsProcessing(true);
    try {
      await updateCategory(selectedCategory);
      message.success("Cập nhật danh mục thành công!");
      handleCloseModal();
    } catch (error) {
      message.error("Icon hoặc màu đã tồn tại");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    Modal.confirm({
      title: "Xác nhận xóa danh mục",
      content: `Bạn có chắc chắn muốn xóa danh mục "${selectedCategory.name}"?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      centered: true,
      onOk: async () => {
        setIsProcessing(true);
        try {
          await deleteCategory(selectedCategory.id);
          message.success("Danh mục đã được xóa thành công!");
          handleCloseModal();
        } catch (error) {
          message.error("Lỗi khi xóa danh mục!");
        } finally {
          setIsProcessing(false);
        }
      },
    });
  };
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen">
        <div className="w-screen flex flex-grow justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="w-full max-w-7xl min-h-[600px]">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Quản lý danh mục
            </h2>
            <div className="flex justify-center gap-4 mb-6">
              <button
                className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                  selectedType === "income"
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md scale-105"
                    : "bg-gray-700 text-gray-400"
                }`}
                onClick={() => setSelectedType("income")}
              >
                Thu nhập 💰
              </button>

              <button
                className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                  selectedType === "expense"
                    ? "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md scale-105"
                    : "bg-gray-700 text-gray-400"
                }`}
                onClick={() => setSelectedType("expense")}
              >
                Chi tiêu 💸
              </button>
            </div>

            <div className="grid grid-cols-5 gap-6">
              {(selectedType === "income"
                ? incomeCategories
                : expenseCategories
              ).map((category) => (
                <button
                  key={category.id}
                  className="p-5 rounded-xl text-white font-medium flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gray-800" // ✅ Đặt nền cố định màu tối
                  style={{
                    minHeight: "90px",
                    justifyContent: "center",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                  }}
                  onClick={() => handleOpenModal(category)}
                >
                  <span
                    style={{
                      color: category.color || "#ffffff",
                      fontSize: "24px",
                    }}
                  >
                    {selectedType === "income"
                      ? incomeIcons[category.icon]
                      : expenseIcons[category.icon]}
                  </span>

                  <span className="mt-1 text-lg text-white">
                    {category.name || "Không tên"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <Modal
          title={
            <span className="text-white text-lg font-semibold">
              Chỉnh sửa danh mục
            </span>
          }
          open={isModalOpen}
          onCancel={handleCloseModal}
          width={800}
          footer={[
            <Button
              key="delete"
              danger
              onClick={handleDelete}
              disabled={isProcessing}
              className="!bg-red-500 hover:bg-red-500 text-white"
            >
              Xóa
            </Button>,
            <Button
              key="save"
              type="primary"
              onClick={handleSave}
              loading={isProcessing}
              className="bg-blue-500 hover:bg-blue-400"
            >
              Lưu
            </Button>,
          ]}
          className="custom-modal"
        >
          {selectedCategory && (
            <div className="flex flex-col gap-4 bg-gray-900 p-6 rounded-lg">
              <label className="text-white font-semibold">Tên danh mục</label>
              <Input
                placeholder="Nhập tên danh mục"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                  })
                }
                className="bg-gray-800 text-white p-3 rounded-md border border-gray-700"
              />

              <label className="text-white font-semibold mt-3">
                Biểu tượng
              </label>
              <div className="grid grid-cols-8 gap-3 bg-gray-800 p-4 rounded-lg border border-gray-700">
                {Object.keys(
                  selectedCategory.type ? incomeIcons : expenseIcons
                ).map((icon) => (
                  <button
                    key={icon}
                    className={`p-3 rounded-lg flex justify-center items-center border transition-all duration-300 ${
                      selectedCategory.icon === icon
                        ? "bg-blue-500 text-white scale-110 border-blue-400"
                        : "bg-gray-900 text-gray-400 hover:bg-gray-800 border-gray-700"
                    }`}
                    onClick={() =>
                      setSelectedCategory({ ...selectedCategory, icon })
                    }
                  >
                    {selectedCategory.type
                      ? incomeIcons[icon]
                      : expenseIcons[icon]}
                  </button>
                ))}
              </div>

              <label className="text-white font-semibold mt-3">Màu sắc</label>
              <div className="grid grid-cols-8 gap-3 bg-gray-800 p-4 rounded-lg border border-gray-700">
                {colorOptions.map((color, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-2">
                    <button
                      key={colIndex}
                      className={`w-10 h-10 rounded-md border ${
                        selectedCategory.color === color
                          ? "border-4 border-white shadow-lg brightness-125 scale-105"
                          : "border-2 border-gray-600 hover:border-gray-400 hover:brightness-110 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        setSelectedCategory({ ...selectedCategory, color })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default CategoryList;
