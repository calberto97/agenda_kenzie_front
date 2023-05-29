import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../pages/Login";
import { MainPage } from "../pages/Main";


export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}