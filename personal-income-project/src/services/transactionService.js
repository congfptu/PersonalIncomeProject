import axiosInstance from "./axiosInstance";

// Tạo danh mục mới
export const createTransaction = async (transactionData) => {
  try {
    const response = await axiosInstance.post(
      "/Transaction/new-transaction",
      transactionData
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi tạo transaction", error);
    throw error;
  }
};

// Lấy danh sách danh mục
export const getTransactions = async (month, year) => {
  try {
    const response = await axiosInstance.get(
      `/Transaction?month=${month}&year=${year}`
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách transactions", error);
    throw error;
  }
};

// Lấy danh sách danh mục
export const getTransactionStatisticYear = async (month, year) => {
  try {
    const response = await axiosInstance.get(
      `/Transaction/get-transaction-statistics?year=${year}&month=${month}`
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy thống kê transactions", error);
    throw error;
  }
};

// Xóa danh mục
export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axiosInstance.post(
      `/Transaction/delete-transaction?transactionId=${transactionId}`
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi xóa danh mục", error);
    throw error;
  }
};

// Xóa danh mục
export const updateTransaction = async (transactionData) => {
  try {
    const response = await axiosInstance.post(
      `/Transaction/update-transaction`,
      transactionData
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi xóa danh mục", error);
    throw error;
  }
};
