import { useApi } from "../config/axiosConfig";

class AdminApi {
    axiosInstance :any=useApi()
    async  AdminDashboard(): Promise<any> {
        try {
          const response= await this.axiosInstance.get('/admin/dashboard');
          return response.data;
        } catch (error: unknown) {
         
          return error;
        }
      }
      async  login(values:{ email: string; password: string }): Promise<any> {
        try {
          const response= await this.axiosInstance.post('/auth/admin/login', values);
          return response;
        } catch (error: unknown) {
         
          return error;
        }
      }
        
      
      async fetchTeachers(page: number, limit: number): Promise<{ data: any[], totalPages: number }> {
        try {
          const response= await this.axiosInstance.get(`/admin/teachers`, {
            params: { page, limit },
          });
          return response.data;
        } catch (error) {
          throw new Error('Failed to fetch teachers. Please try again later.');
        }
      }
      async logout(): Promise<any> {
        try {
          return await this.axiosInstance.get('/auth/admin/logout');
        } catch (error: unknown) {
         
          return error;
        }
      }

      async fetchStudents(page: number, pageSize: number): Promise<any> {
        try {
          const response= await this.axiosInstance.get(`/admin/students?page=${page}&pageSize=${pageSize}`);
          return response;
        } catch (error: unknown) {
          return error;
        }
      }
      async RejectTeacher(teacherid: string, rejectionReason: string): Promise<any> {
        try {
          const response= await this.axiosInstance.patch(`/admin/teacher/reject/${teacherid}`,{rejectionReason});
         
          return response;
        } catch (error: unknown) {
          return error;
        }
      }
      async approveTeacher(teacherid: string): Promise<any> {
        try {
          const response= await this.axiosInstance.patch(`/admin/teacher/approve/${teacherid}`);
          
          return response;
        } catch (error: unknown) {
          return error;
        }
      }
    
      // Admin: Block Student
      async blockStudent(studentId: string): Promise<any> {
        try {
          const response= await this.axiosInstance.put(`/admin/student-block/${studentId}`);
          return response;
        } catch (error: unknown) {
          return error;
        }
      }
    
      // Admin: Unblock Student
      async unblockStudent(studentId: string): Promise<any> {
        try {
          const response = await this.axiosInstance.put(`/admin/student-unblock/${studentId}`);
          return response;
        } catch (error: unknown) {
          return error;
        }
      }
      async blockTeacher(id: string): Promise<void> {
        try {
          return await this.axiosInstance.put(`/admin/teacher-block/${id}`);
        } catch (error) {
          throw new Error('Failed to block the teacher. Please try again later.');
        }
      }
    
      async unblockTeacher(id: string): Promise<void> {
        try {
          return await this.axiosInstance.put(`/admin/teacher-unblock/${id}`);
        } catch (error) {
          throw new Error('Failed to unblock the teacher. Please try again later.');
        }
      }
}

export default new AdminApi()