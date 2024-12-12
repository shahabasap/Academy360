import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import studentApi from "../../api/studentApi";
import ResetPasswordPage from "../../components/common/ResetPassword";
import useRole from "../../hooks/RoleState";

const ResetPasswordPageForStudent = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const role=useRole()

  if (!token) {
    toast.error("Invalid or missing token.");
    navigate("/error");
    return null;
  }

  const handleResetPassword = async (data: { password: string }) => {
    const { password } = data;

    const response = await studentApi.resetPassword(token, password);
    if (response.status === 200) {
      toast.success(response.data.message);
      navigate(`/${role}`);
    } else {
      toast.error(response.response.data.message || "Password reset failed");
    }
  };

  return (
    <div>
      <ResetPasswordPage onSubmit={handleResetPassword} />
    </div>
  );
};

export default ResetPasswordPageForStudent;
