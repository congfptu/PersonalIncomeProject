import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { Card, Spin, Typography, DatePicker } from "antd";
import { getTransactionStatisticYear } from "../services/transactionService.js";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import dayjs from "dayjs";
import {
  DollarCircleOutlined,
  MoneyCollectOutlined,
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
const allIcons = {
  DollarCircleOutlined: <DollarCircleOutlined />,
  BankOutlined: <BankOutlined />,
  GiftOutlined: <GiftOutlined />,
  TrophyOutlined: <TrophyOutlined />,
  PieChartOutlined: <PieChartOutlined />,
  WalletOutlined: <WalletOutlined />,
  RocketOutlined: <RocketOutlined />,
  CarOutlined: <CarOutlined />,
  HeartOutlined: <HeartOutlined />,
  HomeOutlined: <HomeOutlined />,
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
  ShoppingCartOutlined: <ShoppingCartOutlined />,
  PhoneOutlined: <PhoneOutlined />,
  MedicineBoxOutlined: <MedicineBoxOutlined />,
  GiftFilled: <GiftFilled />,
  HomeFilled: <HomeFilled />,
};

const TransactionStatistics = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("year");
  const [activeChart, setActiveChart] = useState("spend");

  useEffect(() => {
    if (activeTab === "year") {
      fetchTransactionStatisticsYear(year);
    } else {
      fetchTransactionStatisticsMonth(year, month);
    }
  }, [year, month, activeTab]);

  const fetchTransactionStatisticsYear = async (selectedYear) => {
    setLoading(true);
    try {
      const response = await getTransactionStatisticYear(0, selectedYear);
      if (response.data.code === 200) {
        setStatistics(response.data.dataList[0] || {});
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê năm:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionStatisticsMonth = async (
    selectedYear,
    selectedMonth
  ) => {
    setLoading(true);
    try {
      const response = await getTransactionStatisticYear(
        selectedMonth,
        selectedYear
      );
      if (response.data.code === 200) {
        setStatistics(response.data.dataList[0] || {});
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê tháng:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date, dateString) => {
    if (activeTab === "year") {
      setYear(dayjs(dateString).year());
    } else {
      setYear(dayjs(dateString).year());
      setMonth(dayjs(dateString).month() + 1);
    }
  };

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  const spendData = statistics?.listSpend || [];
  const collectData = statistics?.listCollect || [];
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-screen h- flex flex-col flex-grow items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20 mt-40 pb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center mt-20">
          Tổng quan tài chính thu nhập và chi tiêu
        </h2>
        <div className="flex flex-col items-center gap-2 w-full max-w-2xl p-4 bg-gray-800 rounded-lg">
          <div className="flex justify-between w-full gap-4">
            <div className="flex flex-1 gap-2">
              <button
                className={`flex-1 px-4 py-2 rounded-l-md font-medium transition-all ${
                  activeTab === "year"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600 text-gray-300"
                }`}
                onClick={() => setActiveTab("year")}
              >
                Theo năm
              </button>
              <button
                className={`flex-1 px-4 py-2 rounded-r-md font-medium transition-all ${
                  activeTab === "month"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600 text-gray-300"
                }`}
                onClick={() => setActiveTab("month")}
              >
                Theo tháng
              </button>
            </div>

            <DatePicker
              className="h-10 w-40 text-center"
              picker={activeTab === "year" ? "year" : "month"}
              onChange={handleDateChange}
              value={
                activeTab === "year"
                  ? dayjs().year(year)
                  : dayjs()
                      .year(year)
                      .month(month - 1)
              }
              style={{
                backgroundColor: "#1f2937",
                color: "white",
                fontWeight: "bold",
                border: "1px solid #555",
                borderRadius: "6px",
              }}
              allowClear={false}
            />
          </div>

          <div className="flex w-full gap-2">
            <button
              className={`flex-1 px-4 py-2 rounded-r-md font-medium transition-all ${
                activeChart === "collect"
                  ? "bg-green-500 text-white"
                  : "bg-gray-600 text-gray-300"
              }`}
              onClick={() => setActiveChart("collect")}
            >
              Thu Nhập
            </button>
            <button
              className={`flex-1 px-4 py-2 rounded-l-md font-medium transition-all ${
                activeChart === "spend"
                  ? "bg-red-800 text-white"
                  : "bg-gray-600 text-gray-300"
              }`}
              onClick={() => setActiveChart("spend")}
            >
              Chi Tiêu
            </button>
          </div>
        </div>

        <div className="flex flex-row justify-center items-start w-full max-w-4xl mt-8">
          <div className="mr-20">
            <Card
              style={{
                textAlign: "center",
                width: "100%",
                backgroundColor: "#1F2937",
                color: "white",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Title level={4} style={{ color: "white" }}>
                {activeChart === "spend"
                  ? `Thống kê Chi Tiêu (${
                      activeTab === "year" ? year : `${month}/${year}`
                    })`
                  : `Thống kê Thu Nhập (${
                      activeTab === "year" ? year : `${month}/${year}`
                    })`}
              </Title>
              <PieChart width={500} height={500}>
                <Pie
                  data={activeChart === "spend" ? spendData : collectData}
                  dataKey="percentage"
                  nameKey="categoryName"
                  cx="50%"
                  cy="50%"
                  outerRadius={160}
                  label
                >
                  {(activeChart === "spend" ? spendData : collectData).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry?.color || "#ccc"}
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </Card>
          </div>
          <div
            className=""
            style={{
              padding: 10,
              border: "1px solid #555",
              maxHeight: "550px",
              backgroundColor: "#1f2937",
              borderRadius: "8px",
            }}
          >
            {(activeChart === "spend"
              ? statistics.listSpend
              : statistics.listCollect
            ).map((entry, index) => (
              <div key={index} className="flex items-center mb-2 w-[240px]">
                <span
                  className="text-2xl pr-4 w-8 flex justify-center"
                  style={{ color: entry.color || "#ffffff" }}
                >
                  {allIcons[entry.icon]}
                </span>
                <span className="text-sm text-white">
                  {entry.categoryName}:{" "}
                  <strong>{entry.totalAmount.toLocaleString()} VND</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TransactionStatistics;
