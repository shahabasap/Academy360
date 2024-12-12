import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "../../components/common/Register";
import studentApi from "../../api/studentApi";

const StudentRegisterPage= () => {
    const navigate=useNavigate()
    

    const handleRegister = async (values: {name:string, email: string; password: string }) => {
          const {email}=values
         const response=await studentApi.register(values)
         if(response.status==200)
         {
            navigate(`/student/verify/${email}`)
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

export default StudentRegisterPage
