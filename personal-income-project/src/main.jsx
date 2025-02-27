import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css"; // ✅ Cần thiết cho Ant Design v5+

createRoot(document.getElementById("root")).render(<App />);
