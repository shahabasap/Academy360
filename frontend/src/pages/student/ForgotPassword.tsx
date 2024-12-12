
import ForgotPasswordPage from "../../components/common/ForgotPassword";
import { toast } from "react-toastify";
import studentApi from "../../api/studentApi";

const StudentForgotPassword = () => {
  const handleResetPassword = async (email: string) => {

        const response = await studentApi.forgotPassword(email);
        if (response.status === 200) {
          toast.success("Password reset link sent to your email.");
        } else {
          toast.error(response.response.data.message || "Network error" )
        }
  };

  return <ForgotPasswordPage onSubmit={handleResetPassword} />;
};

export default StudentForgotPassword;
