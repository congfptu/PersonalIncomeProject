import LoginForm from "./components/LoginForm.jsx";
import ExpenseTracker from "./components/ExpenseTracker";
import IncomeExpenseForm from "./components/IncomeExpenseForm.jsx";
import CategoryForm from "./components/CategoryForm.jsx";
import CategoryManage from "./components/CategoryManage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import TransactionStatistic from "./components/TransactionStatistics.jsx";
import TransactionCategoryStatistic from "./components/TransactionCategoryStatistics.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "antd/dist/reset.css"; // ✅ Cần thiết cho Ant Design v5+

function App() {
  return (
    <Router>
      <Routes>
        {/* Khi mở ứng dụng, luôn vào trang login */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/expense-tracker" />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/income-expense-form" element={<IncomeExpenseForm />} />
          <Route path="/register-category" element={<CategoryForm />} />
          <Route path="/manage-category" element={<CategoryManage />} />
          <Route
            path="/transaction-category-statistics"
            element={<TransactionCategoryStatistic />}
          />
          <Route
            path="/transaction-statistics-year"
            element={<TransactionStatistic />}
          />
        </Route>
        <Route path="/login" element={<LoginForm />} /> {/* Mặc định */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
