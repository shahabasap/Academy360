import { Route, Routes } from "react-router-dom";
import RoleProvider from "../context/RoleContext";
import TeacherLoginPage from "../pages/teacher/Login";
import TeacherRegisterPage from "../pages/teacher/Register";
import TeacherOtpPage from "../pages/teacher/Otp";
import TeacherForgotPassword from "../pages/teacher/ForgotPassword";
import ResetPasswordPageForTeacher from "../pages/teacher/ResetPassword";

const TeacherRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<RoleProvider role="teacher" />}>
    <Route path="" element={<TeacherLoginPage />} />
    <Route path="signUp" element={<TeacherRegisterPage />} />
    <Route path="verify/:email" element={<TeacherOtpPage />} />
    <Route path="forgot-password/" element={<TeacherForgotPassword />} />
    <Route path="reset-password/:token" element={<ResetPasswordPageForTeacher />} />
    <Route path="home" element={<h1>home page here teacher</h1>} />
    </Route>
 </Routes>
  )
}

export default TeacherRoutes
