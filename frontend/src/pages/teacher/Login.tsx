
import Login from "../../components/common/Login"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import teacherApi from "../../api/teacherApi";

const TeacherLoginPage = () => {

    // const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogin = async (values: { email: string; password: string }) => {
      
         const response=await teacherApi.login(values)
         if(response.status==200)
          {
            navigate('/teacher/home')
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

export default TeacherLoginPage
