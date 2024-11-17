export interface ITeacherAuthServices {
    signUp(data: { name: string; username: string; password: string }): Promise<any>;
    signIn(data: { username: string; password: string }): Promise<any>;
    forgotPassword(username: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;

  }
  