import React, { useState } from "react";
import { Form, Input, Button, message, notification } from "antd";
import { createCategory } from "../services/categoryServices";
import Header from "./Header.jsx";
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

const icons = {
  income: [
    { name: "DollarCircleOutlined", icon: <DollarCircleOutlined /> },
    { name: "BankOutlined", icon: <BankOutlined /> },
    { name: "GiftOutlined", icon: <GiftOutlined /> },
    { name: "TrophyOutlined", icon: <TrophyOutlined /> },
    { name: "PieChartOutlined", icon: <PieChartOutlined /> },
    { name: "WalletOutlined", icon: <WalletOutlined /> },
    { name: "RocketOutlined", icon: <RocketOutlined /> },
    { name: "HomeOutlined", icon: <HomeOutlined /> },
    { name: "CarOutlined", icon: <CarOutlined /> },
    { name: "HeartOutlined", icon: <HeartOutlined /> },
    { name: "ReadOutlined", icon: <ReadOutlined /> },
    { name: "DesktopOutlined", icon: <DesktopOutlined /> },
    { name: "CameraOutlined", icon: <CameraOutlined /> },
    { name: "BulbOutlined", icon: <BulbOutlined /> },
    { name: "ToolOutlined", icon: <ToolOutlined /> },
    { name: "CoffeeOutlined", icon: <CoffeeOutlined /> },
    { name: "ShoppingOutlined", icon: <ShoppingOutlined /> },
    { name: "BankFilled", icon: <BankFilled /> },
    { name: "TrophyFilled", icon: <TrophyFilled /> },
    { name: "CarFilled", icon: <CarFilled /> },
  ],
  expense: [
    { name: "ShoppingCartOutlined", icon: <ShoppingCartOutlined /> },
    { name: "PhoneOutlined", icon: <PhoneOutlined /> },
    { name: "MedicineBoxOutlined", icon: <MedicineBoxOutlined /> },
    { name: "GiftFilled", icon: <GiftFilled /> },
    { name: "CarOutlined", icon: <CarOutlined /> },
    { name: "BankOutlined", icon: <BankOutlined /> },
    { name: "TrophyOutlined", icon: <TrophyOutlined /> },
    { name: "HomeFilled", icon: <HomeFilled /> },
    { name: "ShoppingOutlined", icon: <ShoppingOutlined /> },
    { name: "CoffeeOutlined", icon: <CoffeeOutlined /> },
    { name: "BulbOutlined", icon: <BulbOutlined /> },
    { name: "ToolOutlined", icon: <ToolOutlined /> },
    { name: "DesktopOutlined", icon: <DesktopOutlined /> },
    { name: "ReadOutlined", icon: <ReadOutlined /> },
    { name: "RocketOutlined", icon: <RocketOutlined /> },
    { name: "WalletOutlined", icon: <WalletOutlined /> },
    { name: "PieChartOutlined", icon: <PieChartOutlined /> },
    { name: "BankFilled", icon: <BankFilled /> },
    { name: "TrophyFilled", icon: <TrophyFilled /> },
    { name: "CarFilled", icon: <CarFilled /> },
  ],
};

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
const CategoryForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [color, setColor] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [categoryType, setCategoryType] = useState("income");
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (type) => {
    if (type != categoryType) {
      setCategoryType(type);
      setSelectedIcon(null);
      setColor(null);
      form.resetFields();
    }
  };

  const handleSave = async (values) => {
    if (!selectedIcon) {
      message.warning("Vui lòng chọn biểu tượng!");
      return;
    }
    console.log(color);
    if (!color) {
      console.log(color);
      message.warning("Vui lòng chọn màu sắc!");
      return;
    }

    const newCategory = {
      name: values.name,
      type: categoryType === "income",
      icon: selectedIcon,
      color: color,
    };

    try {
      setLoading(true);
      const response = await createCategory(newCategory);

      notification.success({
        message: "Thành công!",
        description: `Danh mục "${values.name}" đã được tạo thành công.`,
        placement: "topRight",
        duration: 3,
      });

      form.resetFields();
      setSelectedIcon(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error("Icon hoặc màu đã tồn tại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black mt-20">
        <div className="w-[1000px] bg-gray-900 p-6 rounded-lg shadow-lg min-h-[700px] mt-16">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
            Tạo mới danh mục
          </h2>

          <div className="flex justify-center mb-5">
            <button
              className={`w-1/2 py-2 text-lg font-semibold rounded-l-lg ${
                categoryType === "income"
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-gray-400"
              } transition-all duration-200`}
              type="button"
              onClick={() => handleCategoryChange("income")}
            >
              Thu nhập
            </button>
            <button
              className={`w-1/2 py-2 text-lg font-semibold rounded-r-lg ${
                categoryType === "expense"
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 text-gray-400"
              } transition-all duration-200`}
              type="button"
              onClick={() => handleCategoryChange("expense")}
            >
              Chi tiêu
            </button>
          </div>

          <Form layout="vertical" form={form} onFinish={handleSave}>
            <Form.Item
              name="name"
              label={
                <span className="text-white text-lg font-semibold">
                  Tên danh mục
                </span>
              }
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input
                placeholder="Nhập tên danh mục"
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder-gray-400
               hover:border-gray-600 hover:bg-gray-800 focus:outline-none
               !border-gray-600 !shadow-none"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-white text-lg font-semibold">
                  Biểu tượng
                </span>
              }
              rules={[{ required: true, message: "Vui lòng nhập biểu tượng!" }]}
            >
              <div className="grid grid-cols-8 gap-2">
                {icons[categoryType].map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedIcon(item.name)}
                    className={`w-12 h-12 flex items-center justify-center text-2xl rounded-md border transition-all duration-200 ${
                      selectedIcon === item.name
                        ? "border-4 border-yellow-500 bg-gray-600 scale-105"
                        : "border-gray-600 bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </Form.Item>

            <Form.Item
              label={
                <span className="text-white text-lg font-semibold">
                  Màu sắc
                </span>
              }
              rules={[{ required: true, message: "Vui lòng nhập biểu tượng!" }]}
            >
              <div className="grid grid-cols-8 gap-2">
                {colorOptions.map((col, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setColor(col)}
                    className="w-8 h-8 rounded-md transition-all duration-200"
                    style={{
                      backgroundColor: col,
                      border: color === col ? "4px solid yellow" : "none",
                      transform: color === col ? "scale(1.1)" : "scale(1)",
                    }}
                  ></button>
                ))}
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryForm;
