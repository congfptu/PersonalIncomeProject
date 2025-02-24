import axiosInstance from "./axiosInstance";
export const createCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post(
      "/Category/new-category",
      categoryData
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi tạo danh mục", error);
    throw error;
  }
};

export const getCategory = async () => {
  try {
    const response = await axiosInstance.get("Category/get-category");
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách danh mục", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(
      `/Category/delete-category?categoryId=${categoryId}`
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi xóa danh mục", error);
    throw error;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await axiosInstance.get(
      `/Category/get-by-id-category?categoryId=${categoryId}`
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi xóa danh mục", error);
    throw error;
  }
};

export const updateCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post(
      `/Category/update-category`,
      categoryData
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi xóa danh mục", error);
    throw error;
  }
};
