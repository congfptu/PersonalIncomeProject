import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  ExclamationCircleOutlined,
  HomeOutlined,
  RedoOutlined,
} from "@ant-design/icons";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <ExclamationCircleOutlined
        style={{ fontSize: "100px", color: "#ff4d4f" }}
      />
      <h1 className="text-5xl font-bold mt-5">Ôi không! Trang không tồn tại</h1>

      <p className="text-lg opacity-80 mt-2">
        Có vẻ như bạn đã nhập sai đường dẫn hoặc trang này không còn tồn tại.
      </p>

      <div className="mt-6 flex gap-4">
        <Button
          type="primary"
          size="large"
          className="bg-blue-500 hover:bg-blue-600 transition-all flex items-center"
          onClick={() => navigate("/")}
        >
          <HomeOutlined className="mr-2 text-xl" />
          Quay lại trang chính
        </Button>

        <Button
          type="default"
          size="large"
          className="bg-gray-700 text-white hover:bg-gray-600 transition-all flex items-center"
          onClick={() => navigate(-1)}
        >
          <RedoOutlined className="mr-2 text-xl" />
          Thử lại
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
