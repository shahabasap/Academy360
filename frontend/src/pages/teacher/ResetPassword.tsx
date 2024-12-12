import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import teacherApi from "../../api/teacherApi";
import ResetPasswordPage from "../../components/common/ResetPassword";
import useRole from "../../hooks/RoleState";

const ResetPasswordPageForTeacher = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const role=useRole()

  // Check if token is missing
  if (!token) {
    toast.error("Invalid or missing token.");
    navigate("/error"); // Navigate to an error page or replace with a valid route
    return null; // Return null to avoid rendering the form
  }

  const handleResetPassword = async (data: { password: string }) => {
    const { password } = data;

      const response = await teacherApi.resetPassword(token, password);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate(`/${role}`);      }
        else{
        toast.error(response.response.data.message || "Password reseted successfully" )
      }
   
  };

  return (
    <div>
      <ResetPasswordPage onSubmit={handleResetPassword} />
    </div>
  );
};

export default ResetPasswordPageForTeacher;
