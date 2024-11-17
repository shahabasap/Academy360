export interface IStudentAuthServices {
    signUp(data: { name: string; username: string; password: string }): Promise<any>;
    signIn(data: { username: string; password: string }): Promise<any>;
    forgotPassword(username: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<string>;
   
  }
  