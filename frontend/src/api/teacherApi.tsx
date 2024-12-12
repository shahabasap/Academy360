import { useApi } from "../config/axiosConfig";

class TeacherApi{
    axiosInstance :any=useApi()
    role='teacher'

    async register(values: { name: string; email: string; password: string }): Promise<any> {
        try {
          return await this.axiosInstance.post('/auth/teacher/register',values);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async login(values: { email: string; password: string }): Promise<any> {
        try {
            const data= await this.axiosInstance.post('/auth/teacher/login',values);
            
            return data
        } catch (error: unknown) {
         
          return error;
        }
      }
    async verify(email:string,otp:string): Promise<any> {
        try {
          
          return await this.axiosInstance.post('/auth/teacher/verify',{email:email,otp:otp,role:this.role});
        } catch (error: unknown) {
         
          return error;
        }
      }
    async forgotPassword(email:string): Promise<any> {
        try {
          
          return await this.axiosInstance.post('/auth/teacher/forgotpassword',{email:email});
        } catch (error: unknown) {
         
          return error;
        }
      }
    async teacherData(email:string): Promise<any> {
        try {
          
          return await this.axiosInstance.post('/auth/teacher/forgotpassword',{email:email});
        } catch (error: unknown) {
         
          return error;
        }
      }
    async resetPassword(token:string,newPassword:string): Promise<any> {
        try {
          
          return await this.axiosInstance.post('/auth/teacher/reset-password',{token,newPassword});
        } catch (error: unknown) {
         
          return error;
        }
      }
    async logout(): Promise<any> {
        try {
          return await this.axiosInstance.get('/auth/teacher/logout');
        } catch (error: unknown) {
         
          return error;
        }
      }
   

   
       
   
}
export default new TeacherApi()