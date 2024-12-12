import { useApi } from "../config/axiosConfig";

class StudenApi{
    axiosInstance :any=useApi()
    role='student'

    async register(values: { name: string; email: string; password: string }): Promise<any> {
        try {
          return await this.axiosInstance.post('/auth/student/register',values);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async login(values: { email: string; password: string }): Promise<any> {
        try {
            const data= await this.axiosInstance.post('/auth/student/login',values);
            return data
        } catch (error: unknown) {
         
          return error;
        }
      }
      async verify(email:string,otp:string): Promise<any> {
        try {
            
            
          return await this.axiosInstance.post('/auth/student/verify',{email,otp,role:this.role});
        } catch (error: unknown) {
         
          return error;
        }
      }
      async forgotPassword(email:string): Promise<any> {
        try {
          
          return await this.axiosInstance.post('/auth/student/forgotpassword',{email:email});
        } catch (error: unknown) {
         
          return error;
        }
      }
      async resetPassword(token:string,newPassword:string): Promise<any> {
        try {
          
          return await this.axiosInstance.post('/auth/student/reset-password',{token,newPassword});
        } catch (error: unknown) {
         
          return error;
        }
      }
    async logout(): Promise<any> {
        try {
          return await this.axiosInstance.get('/auth/student/logout');
        } catch (error: unknown) {
         
          return error;
        }
      }
      async editProfile(studentId: string, formData: FormData): Promise<any> {
        try {
          const response = await this.axiosInstance.put(`/profile/${studentId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response;
        } catch (error: unknown) {
          return error;
        }
      }
      async updateProfile(studentid:string,formData:FormData): Promise<any> {
        try {
       
          const response = await this.axiosInstance.put(`/profile/${studentid}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true });
          return response;
        } catch (error) {
          throw new Error('Failed to fetch teachers. Please try again later.');
        }
      }
       
      async studentData(studentId:string): Promise<any> {
        try {
          const response= await this.axiosInstance.get(`/student/profile/${studentId}`);
          return response;
        } catch (error) {
          throw new Error('Failed to fetch teachers. Please try again later.');
        }
      }
}
export default new StudenApi()
