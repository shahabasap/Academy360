export interface ITeacherAuthServices {
    signUp(data: { name: string; email: string; password: string }): Promise<any>;
    signIn(data: { email: string; password: string }): Promise<any>;
    forgotPassword(email: string): Promise<{success:boolean}>;
    resetPassword(token: string, newPassword: string): Promise<{success:boolean}>;

  }
  