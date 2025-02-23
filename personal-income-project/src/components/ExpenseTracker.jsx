import React, { useEffect, useState } from "react";
import Footer from "./Footer.jsx";
import {
  Calendar,
  Card,
  List,
  Typography,
  Row,
  Col,
  Spin,
  message,
  Modal,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import {
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService.js";

import { getCategory } from "../services/categoryServices";
import Header from "./Header.jsx";
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
const ExpenseTracker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [mode, setMode] = useState("month");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    remainingBalance: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reload, setReload] = useState(false);
  const { Title, Text } = Typography;

  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const incomeIcons = {
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
  // Gọi API lấy danh mục khi mở popup
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        if (response.data && response.data.code === 200) {
          setIncomeCategories(
            response.data.dataList[0].listCategoryCollect || []
          );
          setExpenseCategories(
            response.data.dataList[0].listCategorySpend || []
          );
        }
      } catch (error) {
        message.error("Lỗi khi tải danh mục!");
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await getTransactions(
          selectedDate.month() + 1,
          selectedDate.year()
        );
        if (response.data && response.data.code === 200) {
          setTransactions(response.data.dataList || []);
          setSummary(response.data.data);
        } else {
          message.error("Lỗi khi tải giao dịch!");
        }
      } catch (error) {
        message.error("Không thể tải dữ liệu giao dịch.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedDate, reload]);

  // Khi click vào giao dịch -> Mở popup
  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // Đóng popup
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleSaveTransaction = async () => {
    if (!selectedTransaction) return;

    setIsProcessing(true);
    try {
      const payload = {
        transactionId: selectedTransaction.id,
        categoryId: selectedTransaction.categoryId,
        transactionType: selectedTransaction.transactionType,
        newAmount: selectedTransaction.amount,
        description: selectedTransaction.description,
        newDate: selectedTransaction.date,
      };

      await updateTransaction(payload); // Gọi API cập nhật giao dịch
      message.success("Cập nhật giao dịch thành công!");
      handleCloseModal();
      setReload((prev) => !prev); // Cập nhật lại danh sách giao dịch
    } catch (error) {
      message.error("Lỗi khi cập nhật giao dịch!");
    } finally {
      setIsProcessing(false);
    }
  };

  // Xử lý xóa giao dịch với xác nhận
  const handleDeleteTransaction = () => {
    if (!selectedTransaction) return;

    Modal.confirm({
      title: "Xác nhận xóa giao dịch",
      content: `Bạn có chắc chắn muốn xóa giao dịch "${selectedTransaction.categoryName}"?`,
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      centered: true,
      onOk: async () => {
        setIsProcessing(true);
        try {
          await deleteTransaction(selectedTransaction.id);
          message.success("Xóa giao dịch thành công!");
          handleCloseModal();
          setReload((prev) => !prev);
        } catch (error) {
          message.error("Lỗi khi xóa giao dịch!");
        } finally {
          setIsProcessing(false);
        }
      },
    });
  };

  // Nhóm giao dịch theo ngày
  const groupedTransactions = transactions.reduce((acc, curr) => {
    const dateKey = curr.date.split("T")[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(curr);
    return acc;
  }, {});

  // Hiển thị tổng tiền trong lịch
  const dateCellRender = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    if (
      value.year() !== selectedDate.year() ||
      value.month() !== selectedDate.month()
    )
      return null;

    const total = transactions.reduce((acc, curr) => {
      const transactionDate = curr.date.split("T")[0];
      return transactionDate === dateString
        ? acc +
            (curr.transactionTypeDescription === "Income"
              ? curr.amount
              : -curr.amount)
        : acc;
    }, 0);

    return total !== 0 ? (
      <Text strong style={{ color: total > 0 ? "green" : "red" }}>
        {total.toLocaleString()}đ
      </Text>
    ) : null;
  };

  return (
    <div className="flex flex-col min-h-screen mt-10">
      <div className="w-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black flex-grow">
        <Header />
        <div style={{ padding: "20px", maxWidth: "95%", margin: "0 auto" }}>
          <h2 className="text-2xl font-semibold mb-4 text-center mt-20">
            Tổng quan tài chính theo danh mục
          </h2>
          {loading ? (
            <Spin
              size="large"
              className="flex justify-center items-center h-screen"
            />
          ) : (
            <Row gutter={[30, 30]} style={{ height: "100%", display: "flex" }}>
              {/* Lịch thu chi */}
              <Col
                span={16}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Card style={{ flex: 1 }}>
                  <Title level={3}>📅 Lịch thu chi</Title>
                  {/* Bộ chọn tháng/năm thay thế mặc định */}
                  <div className="flex justify-center mb-4">
                    <DatePicker
                      picker="month"
                      value={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      format="MM/YYYY"
                      allowClear={false} // Không cho phép xóa ngày
                    />
                  </div>

                  <Calendar
                    fullscreen={false}
                    mode={mode}
                    value={selectedDate}
                    onSelect={setSelectedDate}
                    onPanelChange={setSelectedDate}
                    headerRender={() => null}
                    dateCellRender={mode === "month" ? dateCellRender : null}
                  />
                </Card>
                <Card style={{ flex: 1, marginTop: "20px" }}>
                  <Title level={3}>📊 Bảng tổng quan</Title>
                  <Text strong>
                    <MoneyCollectOutlined
                      style={{ color: "green", marginRight: "8px" }}
                    />
                    Thu nhập:{" "}
                    <span style={{ color: "green" }}>
                      {summary.totalIncome.toLocaleString()}đ
                    </span>
                  </Text>
                  <br />
                  <Text strong>
                    <ShoppingCartOutlined
                      style={{ color: "red", marginRight: "8px" }}
                    />
                    Chi tiêu:{" "}
                    <span style={{ color: "red" }}>
                      {summary.totalExpense.toLocaleString()}đ
                    </span>
                  </Text>
                  <br />
                  <Text strong>
                    Tổng kết thu chi:{" "}
                    <span
                      style={{
                        color: summary.remainingBalance >= 0 ? "green" : "red",
                      }}
                    >
                      {summary.totalIncome - summary.totalExpense}đ
                    </span>
                  </Text>
                </Card>
              </Col>

              {/* Danh sách giao dịch */}
              <Col
                span={8}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Card
                  style={{
                    flex: 1,
                    fontSize: "18px",
                    minHeight: "662px", // ✅ Giữ chiều cao cố định
                    backgroundColor: "#1a1d2b", // ✅ Màu nền tối
                    border: "1px solid #2e3548", // ✅ Viền giống form
                    color: "#ffffff", // ✅ Màu chữ trắng
                    borderRadius: "12px", // ✅ Bo góc nhẹ
                    display: "flex",
                    flexDirection: "column",

                    overflow: "hidden", // 🔹 Chỉ ẩn cuộn cho cả khối, không ảnh hưởng nội dung cuộn bên trong
                  }}
                >
                  {/* ✅ Tiêu đề cố định */}
                  <div
                    style={{
                      top: "0",
                      backgroundColor: "#1a1d2b", // ✅ Giữ nguyên màu nền
                      zIndex: 100,
                      padding: "16px",
                      borderBottom: "1px solid #2e3548",
                    }}
                  >
                    <Title level={3} style={{ color: "#ffffff", margin: 0 }}>
                      💰 Danh sách giao dịch
                    </Title>
                  </div>

                  {/* ✅ Vùng danh sách cuộn */}
                  <div
                    style={{
                      flex: 1,
                      overflowY: "auto", // ✅ Cho phép cuộn dọc
                      padding: "16px",
                      maxHeight: "550px", // ✅ Đảm bảo có không gian để cuộn
                    }}
                  >
                    <List
                      dataSource={Object.keys(groupedTransactions).sort(
                        (a, b) => dayjs(b).diff(dayjs(a))
                      )}
                      renderItem={(date) => (
                        <List.Item>
                          <Card
                            style={{
                              width: "100%",
                              fontSize: "16px",
                              backgroundColor: "#252a3a", // ✅ Màu nền item tối hơn card chính
                              border: "1px solid #2e3548",
                              color: "#ffffff",
                              borderRadius: "8px",
                            }}
                          >
                            <Title level={4} style={{ color: "#ffffff" }}>
                              {dayjs(date).format("DD/MM/YYYY")}
                            </Title>
                            <List
                              dataSource={groupedTransactions[date]}
                              renderItem={(item) => (
                                <List.Item
                                  onClick={() => handleOpenModal(item)}
                                  style={{
                                    cursor: "pointer",
                                    backgroundColor: "#2c3144", // ✅ Màu nền tối hơn chút nữa
                                    padding: "10px",
                                    marginBottom: "5px",
                                    borderRadius: "8px",
                                    transition:
                                      "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    border: "1px solid #3a3f56", // ✅ Viền nhẹ
                                    color: "#ffffff",

                                    /* ✅ Hiệu ứng mặc định */
                                    transform: "translateY(0)",
                                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                      "translateY(-2px)"; // ✅ Đẩy lên nhẹ khi hover
                                    e.currentTarget.style.backgroundColor =
                                      "#374151"; // ✅ Đổi màu nền
                                    e.currentTarget.style.boxShadow =
                                      "0px 8px 15px rgba(0, 0, 0, 0.3)"; // ✅ Tạo bóng mượt
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                      "translateY(0)"; // ✅ Trở về vị trí cũ
                                    e.currentTarget.style.backgroundColor =
                                      "#2c3144"; // ✅ Trở về màu gốc
                                    e.currentTarget.style.boxShadow =
                                      "0px 0px 5px rgba(0, 0, 0, 0.2)"; // ✅ Giảm bóng đổ
                                  }}
                                >
                                  {/* ✅ Icon danh mục */}

                                  <Text
                                    style={{
                                      color: "#ffffff",
                                      display: "flex",
                                      alignItems: "center", // ✅ Căn giữa icon & text
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: item.color || "#ffffff",
                                        fontSize: "24px",
                                        paddingRight: 15,
                                        display: "flex",
                                        alignItems: "center",
                                        width: "30px", // ✅ Đảm bảo khoảng trống cố định ngay cả khi không có icon
                                        justifyContent: "center",
                                      }}
                                    >
                                      {item.icon
                                        ? item.transactionTypeDescription ===
                                          "Income"
                                          ? incomeIcons[item.icon]
                                          : expenseIcons[item.icon]
                                        : null}{" "}
                                      {/* ✅ Nếu không có icon thì giữ khoảng trống, tránh lệch dòng */}
                                    </span>
                                    {item.categoryName}{" "}
                                    {item.description
                                      ? `(${item.description})`
                                      : ""}
                                  </Text>

                                  <Text
                                    style={{
                                      color:
                                        item.transactionTypeDescription ===
                                        "Income"
                                          ? "#4CAF50" // ✅ Màu xanh nếu là thu nhập
                                          : "#F44336", // ✅ Màu đỏ nếu là chi tiêu
                                    }}
                                  >
                                    {item.amount.toLocaleString()}đ
                                  </Text>
                                </List.Item>
                              )}
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          )}
        </div>

        {/* Popup Chỉnh Sửa Giao Dịch */}
        <Modal
          title={
            <span className="text-white text-lg font-bold">
              Chỉnh sửa giao dịch
            </span>
          }
          open={isModalOpen}
          onCancel={handleCloseModal}
          width={750} // Mở rộng modal
          footer={[
            <Button
              key="delete"
              danger
              onClick={handleDeleteTransaction}
              className="!bg-red-600 text-white hover:bg-red-500 px-6 py-3 rounded-md"
            >
              Xóa
            </Button>,
            <Button
              key="save"
              type="primary"
              onClick={handleSaveTransaction}
              loading={isProcessing}
              className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-3 rounded-md"
            >
              Lưu
            </Button>,
          ]}
          className="custom-modal"
        >
          {selectedTransaction && (
            <div className="flex flex-col gap-6 text-white">
              {/* Chọn danh mục */}
              <div>
                <label className="text-white font-semibold text-sm mb-2 block">
                  Danh mục
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {(selectedTransaction.transactionTypeDescription === "Income"
                    ? incomeCategories
                    : expenseCategories
                  ).map((category) => (
                    <button
                      key={category.id}
                      className={`w-[150px] h-[90px] p-5 rounded-lg flex flex-col items-center justify-center transition-all duration-300 text-white text-lg ${
                        selectedTransaction.categoryId === category.id
                          ? "border-4 border-green-500 scale-105" // ✅ Highlight danh mục đã chọn
                          : "border border-gray-600 hover:border-white"
                      } bg-gray-800`} // ✅ Nền tối cố định
                      onClick={() =>
                        setSelectedTransaction({
                          ...selectedTransaction,
                          categoryId: category.id,
                        })
                      }
                    >
                      {/* ✅ Icon có màu theo category.color */}
                      <span
                        style={{
                          color: category.color || "#ffffff",
                          fontSize: "24px",
                        }}
                      >
                        {selectedTransaction.transactionTypeDescription ===
                        "Income"
                          ? incomeIcons[category.icon]
                          : expenseIcons[category.icon]}
                      </span>

                      {/* ✅ Text màu trắng */}
                      <span className="mt-1 text-base font-semibold text-white text-center">
                        {category.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chỉnh sửa số tiền */}
              <div>
                <label className="text-white font-semibold text-sm mb-2 block">
                  Số tiền
                </label>
                <Input
                  type="text" // ✅ Dùng text để tránh lỗi khi format
                  value={
                    selectedTransaction.amount
                      ? new Intl.NumberFormat("vi-VN").format(
                          selectedTransaction.amount
                        ) // ✅ Giữ dấu phân cách, bỏ "₫"
                      : ""
                  }
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, ""); // ✅ Chỉ lấy số
                    setSelectedTransaction({
                      ...selectedTransaction,
                      amount: rawValue ? parseFloat(rawValue) : 0,
                    });
                  }}
                  className="p-4 rounded-md border border-gray-600 bg-gray-800 text-white w-full text-lg"
                />
              </div>

              {/* Chỉnh sửa ghi chú */}
              <div>
                <label className="text-white font-semibold text-sm mb-2">
                  Ghi chú
                </label>
                <Input.TextArea
                  value={selectedTransaction.description} // ✅ Đổi từ description thành note
                  onChange={(e) =>
                    setSelectedTransaction({
                      ...selectedTransaction,
                      description: e.target.value, // ✅ Đảm bảo đồng bộ với state
                    })
                  }
                  className="p-4 rounded-md border border-gray-600 bg-gray-800 text-white w-full text-lg"
                  rows={3}
                />
              </div>
            </div>
          )}
        </Modal>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ExpenseTracker;
