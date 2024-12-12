import { useNavigate } from "react-router-dom";
import Register from "../../components/common/Register"
import { toast } from "react-toastify";
import teacherApi from "../../api/teacherApi";


const TeacherRegisterPage = () => {
    const navigate=useNavigate()
    

    const handleRegister = async (values: {name:string, email: string; password: string }) => {

            const {email}=values
            const response=await teacherApi.register(values)
            if(response.status==200)
            {
                navigate(`/teacher/verify/${email}`)
            }
            else
            {
                toast.error(response.response.data.message || "registration failed" )
            }
      
      };
  return (
    <div>
      <Register onSubmit={handleRegister} />
    </div>
  )
}

export default TeacherRegisterPage
