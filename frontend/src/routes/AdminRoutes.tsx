import { Route, Routes } from "react-router-dom";
import RoleProvider from "../context/RoleContext";
import AdminLoginPage from "../pages/admin/Login";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RoleProvider role="admin" />}>
        <Route path="" element={<AdminLoginPage />} />
        <Route path="home" element={<>admin home</>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
