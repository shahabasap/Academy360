
import Login from "../../components/common/Login"
import { useNavigate } from "react-router-dom";
import studentApi from "../../api/studentApi";
import { toast } from "react-toastify";


const StudentLoginPage = () => {
    // const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogin = async (values: { email: string; password: string }) => {
  
          const response=await studentApi.login(values)
          if(response.status==200)
          {
            navigate('/teacher/home');
          }
          else
          {
            toast.error(response.response.data.message || "registration failed" )
          }
          
    
      };
  return (
    <div>
      <Login onSubmit={handleLogin} />
    </div>
  )
}

export default StudentLoginPage
