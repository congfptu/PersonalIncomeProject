import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      navigate("/expense-tracker", { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const endpoint = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";
      const requestBody = isLogin
        ? { username, password }
        : { username, email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          isLogin ? "Username hoặc mật khẩu không đúng!" : "Đăng ký thất bại!"
        );
      }

      if (!isLogin) {
        message.success("Đăng ký thành công!");
        setIsLogin(true);
        return;
      } else {
        sessionStorage.setItem("access_token", data.token);
        sessionStorage.setItem("user_name", data.userName);
        navigate("/expense-tracker");
      }
    } catch (error) {
      setErrorMessage(
        isLogin ? "Username hoặc mật khẩu không đúng!" : "Đăng ký thất bại!"
      );
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="w-[400px] p-8 bg-gray-800 text-white rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Đăng Nhập" : "Đăng Ký"}
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 font-medium">Username</label>
            <input
              type="text"
              placeholder="Nhập username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-gray-300 font-medium">Email</label>
              <input
                type="text"
                placeholder="Nhập Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-300 font-medium">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
          >
            {isLogin ? "Đăng Nhập" : "Đăng Ký"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-400 font-medium hover:underline"
          >
            {isLogin ? "Đăng Ký" : "Đăng Nhập"}
          </button>
        </p>
      </div>
    </div>
  );
}
