import "./index.css";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminRoute from "./routes/AdminRoutes";
import TeacherRoute from "./routes/TeacherRoutes";
import StudentRoute from "./routes/StudentRoutes";
import LandingPage from "./pages/LandingPage";
import Navbar from "./layouts/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* ToastContainer for notifications */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
      />

      <Routes>
        <Route element={<Navbar />}>
          {/* Landing Page */}
          <Route index element={<LandingPage />} />
          
          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminRoute />} />

          {/* Teacher routes */}
          <Route path="/teacher/*" element={<TeacherRoute />} />

          {/* Student routes */}
          <Route path="/student/*" element={<StudentRoute />} />
          
          {/* Fallback to LandingPage for undefined routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
