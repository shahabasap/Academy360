
import ForgotPasswordPage from "../../components/common/ForgotPassword";
import { toast } from "react-toastify";
import teacherApi from "../../api/teacherApi";

const TeacherForgotPassword = () => {
  const handleResetPassword = async (email: string) => {

      const response = await teacherApi.forgotPassword(email);
      if (response.status === 200) {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(response.response.data.message || "Network error" )
      }
 
  };

  return <ForgotPasswordPage onSubmit={handleResetPassword} />;
};

export default TeacherForgotPassword;
