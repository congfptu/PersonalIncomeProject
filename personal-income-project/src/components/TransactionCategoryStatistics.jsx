import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Select, Spin, message, DatePicker, Button } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getCategory } from "../services/categoryServices";
import { getTransactionCategory } from "../services/transactionService";
import * as Icons from "@ant-design/icons";
import Header from "./Header";

const { Option } = Select;

const TransactionChart = () => {
  const currentDate = dayjs();
  const [activeTab, setActiveTab] = useState("income");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [chartType, setChartType] = useState("month");
  const [selectedYear, setSelectedYear] = useState(currentDate.year());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month() + 1);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cachedData, setCachedData] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response.data.dataList[0]);
        resetSelectedCategory(response.data.dataList[0]);
      } catch {
        message.error("Lỗi khi lấy danh mục");
      }
    };
    fetchCategories();
  }, []);

  const resetSelectedCategory = useCallback(
    (categoryList) => {
      const filteredCategories =
        activeTab === "income"
          ? categoryList.listCategoryCollect || []
          : categoryList.listCategorySpend || [];
      if (filteredCategories.length > 0) {
        setSelectedCategory(filteredCategories[0].id);
      }
    },
    [activeTab]
  );
  useEffect(() => {
    resetSelectedCategory(categories, activeTab);
  }, [activeTab, categories]);

  const fetchChartData = useCallback(async () => {
    if (!selectedCategory) return;

    const cacheKey = `${activeTab}-${chartType}-${selectedYear}-${selectedMonth}-${selectedCategory}`;
    if (cachedData[cacheKey]) {
      setChartData(cachedData[cacheKey]);
      return;
    }

    setLoading(true);
    // 🛠️ Xử lý dữ liệu để đảm bảo đủ 12 tháng hoặc đủ ngày trong tháng
    const formatChartData = (transactions) => {
      if (chartType === "year") {
        return Array.from({ length: 12 }, (_, i) => ({
          month: i + 1,
          label: `Tháng ${i + 1}`,
          total: transactions.find((t) => t.month === i + 1)?.totalAmount || 0,
          formattedTotal: (
            transactions.find((t) => t.month === i + 1)?.totalAmount || 0
          ).toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
        }));
      } else {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => ({
          day: i + 1,
          label: `${i + 1}`,
          total:
            transactions.find((t) => new Date(t.day).getDate() === i + 1)
              ?.totalAmount || 0,
          formattedTotal: (
            transactions.find((t) => new Date(t.day).getDate() === i + 1)
              ?.totalAmount || 0
          ).toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
        }));
      }
    };

    try {
      const response = await getTransactionCategory({
        categoryId: selectedCategory,
        year: selectedYear,
        month: chartType === "month" ? selectedMonth : 0,
        transactionType: activeTab === "income" ? 1 : 0,
      });

      const transactions =
        response.data.dataList[0].transactionForCategoriesYearOrMonth;
      const formattedData = formatChartData(transactions);

      setChartData(formattedData);
      setCachedData((prev) => ({ ...prev, [cacheKey]: formattedData }));
    } catch (error) {
      message.error("Lỗi khi lấy dữ liệu giao dịch!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [
    selectedCategory,
    chartType,
    selectedYear,
    selectedMonth,
    activeTab,
    cachedData,
  ]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const filteredCategories = useMemo(
    () =>
      activeTab === "income"
        ? categories.listCategoryCollect || []
        : categories.listCategorySpend || [],
    [categories, activeTab]
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white w-screen mt-20">
      <Header />
      <div className="flex flex-col items-center p-6 bg-gray-900 rounded-lg mb-6 w-3/4 mx-auto mt-12">
        <div className="flex justify-center space-x-4 mb-4">
          <Button
            className={`px-28 py-5 font-semibold border-none outline-none
      ${
        activeTab === "income"
          ? "bg-green-600 text-white hover:!bg-green-600 focus:!bg-green-600"
          : "bg-gray-500 text-white hover:!bg-gray-500 focus:!bg-gray-500"
      }`}
            onClick={() => setActiveTab("income")}
          >
            Thu Nhập
          </Button>

          <Button
            className={`px-28 py-5 font-semibold border-none outline-none
            ${
              activeTab === "expense"
                ? "bg-red-600 text-white hover:!bg-red-600 focus:!bg-red-600"
                : "bg-gray-500 text-white hover:!bg-gray-500 focus:!bg-gray-500"
            }`}
            onClick={() => setActiveTab("expense")}
          >
            Chi Tiêu
          </Button>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <Button
            className={`px-24 py-2 font-semibold transition duration-200
    ${
      chartType === "year"
        ? "bg-blue-500 text-white hover:!bg-blue-500 focus:!bg-blue-500 active:!bg-blue-500"
        : "bg-gray-600 text-white hover:!bg-gray-600 focus:!bg-gray-600 active:!bg-gray-600"
    }`}
            onClick={() => setChartType("year")}
          >
            Theo năm
          </Button>

          <Button
            className={`px-24 py-2 font-semibold transition duration-200
    ${
      chartType === "month"
        ? "bg-blue-500 text-white hover:!bg-blue-500 focus:!bg-blue-500 active:!bg-blue-500"
        : "bg-gray-600 text-white hover:!bg-gray-600 focus:!bg-gray-600 active:!bg-gray-600"
    }`}
            onClick={() => setChartType("month")}
          >
            Theo tháng
          </Button>

          <DatePicker
            picker={chartType === "year" ? "year" : "month"}
            value={
              chartType === "year"
                ? dayjs().year(selectedYear)
                : dayjs(
                    `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`,
                    "YYYY-MM"
                  )
            }
            onChange={(date) => {
              if (date) {
                setSelectedYear(date.year());
                if (chartType === "month") setSelectedMonth(date.month() + 1);
              }
            }}
            locale={locale}
            className="bg-gray-700 text-white hover:bg-gray-600 transition duration-200 focus:ring-0 outline-none shadow-none"
            allowClear={false}
          />
        </div>

        <div className="flex justify-center w-1/3">
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            className="w-full bg-gray-700 text-white hover:bg-gray-600 transition duration-200 focus:ring-0 outline-none shadow-none"
          >
            {filteredCategories.map((category) => {
              const IconComponent =
                Icons[category.icon] || Icons.QuestionCircleOutlined;
              return (
                <Option key={category.id} value={category.id}>
                  <span className="flex items-center">
                    <IconComponent
                      className="mr-2"
                      style={{ color: category.color }}
                    />
                    {category.name}
                  </span>
                </Option>
              );
            })}
          </Select>
        </div>
      </div>

      <div className="items-center p-6 bg-gray-900 rounded-lg mb-6 w-3/4 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <Spin size="large" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={500} className="p-4">
            <BarChart data={chartData}>
              <XAxis
                dataKey="label"
                interval={0}
                angle={-30}
                textAnchor="end"
                height={50}
              />
              <YAxis />
              <Tooltip
                cursor={{ fill: "transparent" }}
                formatter={(value) =>
                  value.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                }
              />
              <Bar dataKey="total" fill="#4CAF50" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default TransactionChart;
