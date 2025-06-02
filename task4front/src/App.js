import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import UserTable from "./Pages/UserTable";
import { ToastContainer } from "react-toastify";
export default function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route
          path="/auth"
          element={
            isAuthenticated ? <Navigate to="/admin" replace /> : <AuthPage />
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? <UserTable /> : <Navigate to="/auth" replace />
          }
        />
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}
