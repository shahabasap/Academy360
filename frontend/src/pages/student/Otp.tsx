
import OtpPage from "../../components/common/Otp";
import { useNavigate, useParams } from "react-router-dom";
import studentApi from "../../api/studentApi";
import { toast } from "react-toastify";


const StudentOtpPage = () => {
  const navigate = useNavigate();
  const { email } = useParams();

  const verifyOtp = async (otp: string) => {
    if (!email) {
      console.error("Email is required but not found in params");
      return;
    }

 
      const response = await studentApi.verify(email,otp);
      if (response.status === 200) {
        navigate("/student");
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

export default StudentOtpPage;
