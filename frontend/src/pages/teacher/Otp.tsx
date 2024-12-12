
import OtpPage from "../../components/common/Otp";
import { useNavigate, useParams } from "react-router-dom";
import teacherApi from "../../api/teacherApi";
import { toast } from "react-toastify";

const TeacherOtpPage = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  
  const verifyOtp = async (otp: string) => {
    if (!email) {
      console.error("Email is required but not found in params");
      return;
    }

  
      const response = await teacherApi.verify(email,otp);
      if (response.status == 200) {
        navigate("/teacher");
      }
      else
      {
        toast.error(response.response.data.message || "registration failed" )
      }

  };

  return (
    <div>
      <OtpPage onSubmit={verifyOtp} />
    </div>
  );
};

export default TeacherOtpPage;
