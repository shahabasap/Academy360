import { Route, Routes } from "react-router-dom";
import RoleProvider from "../context/RoleContext";
import StudentLoginPage from "../pages/student/Login";
import StudentRegisterPage from "../pages/student/Register";
import StudentOtpPage from "../pages/student/Otp";
import ResetPasswordPageForStudent from "../pages/student/ResetPassword";
import StudentForgotPassword from "../pages/student/ForgotPassword";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RoleProvider role="student" />}>
        <Route path="" element={<StudentLoginPage />} />
        <Route path="signUp" element={<StudentRegisterPage />} />
        <Route path="verify/:email" element={<StudentOtpPage />} />
        <Route path="forgot-password" element={<StudentForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPasswordPageForStudent />} />
        <Route path="home" element={<h1>home page here student</h1>} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
