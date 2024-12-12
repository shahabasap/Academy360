import ITeacherRepository from "../interfaces/repositoryInterfaces/IteacherRepository";
import { ITeacherAuthServices } from "../interfaces/serviceInterfaces/IauthTeacherServices";
import IJwtTokenService from "../interfaces/utilInterfaces/IJwtTokenService";
import { IPasswordUtility } from "../interfaces/utilInterfaces/IPasswordUtility";
import { CustomErrorClass } from "../types/customError";
import { sendResetPasswordEmail } from "../utils/email";


class TeacherServices implements ITeacherAuthServices {
    private passwordUtility: IPasswordUtility;
    private teacherRepository: ITeacherRepository;
    private jwtTokenService: IJwtTokenService;
    private role='teacher'
  
    constructor(passwordUtility: IPasswordUtility, teacherRepository: ITeacherRepository, jwtTokenService: IJwtTokenService) {
      this.passwordUtility = passwordUtility;
      this.teacherRepository = teacherRepository;
      this.jwtTokenService = jwtTokenService;
    }
  
    async signUp(data: { name: string; email: string; password: string }) {
      const { email, name, password } = data;
  
      // Directly remove non-verified teachers in repository
      await this.teacherRepository.removeNonverifiedTeacherByUsername(email);
  
      const existingTeacher = await this.teacherRepository.findTeacherByUsername(email);
      if (existingTeacher) {
        throw new CustomErrorClass("Username already exists", 400);
      }
  
      const hashedPassword = await this.passwordUtility.getHashedPassword(password);
      return await this.teacherRepository.createTeacher({ ...data, password: hashedPassword });
    }
  
    async signIn(data: { email: string; password: string }) {
      const { email, password } = data;
      const teacher = await this.teacherRepository.findTeacherByUsername(email);
      if (!teacher) {
        throw new CustomErrorClass("Account not verified or blocked", 403);
      }
  
      const isPasswordValid = await this.passwordUtility.comparePassword(password, teacher.password as string);
      if (!isPasswordValid) {
        throw new CustomErrorClass("Invalid username or password", 401);
      }
  
      const { accessToken, refreshToken } = await this.jwtTokenService.generateToken(teacher._id, teacher.role);
    
      return { accessToken ,refreshToken};
    }
  
    async forgotPassword(email: string) {
      const teacher = await this.teacherRepository.findTeacherByUsername(email);
      if (!teacher) {
        throw new CustomErrorClass("Teacher not found", 404);
      }
  
      const resetToken = this.generateResetToken();
      await this.teacherRepository.updateTeacherResetToken(teacher._id, resetToken.token, resetToken.expires);
        await sendResetPasswordEmail(email,this.role,resetToken.token)
        return {success:true}
    }
  
    async resetPassword(token: string, newPassword: string) {
      const hashedPassword = await this.passwordUtility.getHashedPassword(newPassword);
      const teacher = await this.teacherRepository.resetTeacherPassword(token, hashedPassword);
      if (!teacher) {
        throw new CustomErrorClass("Token is invalid or has expired", 400);
      }
      return {success:true}
    }
  
    private generateResetToken() {
      const token = Math.random().toString(36).substr(2);
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiry
      return { token, expires };
    }
  
 
  }
  
  export default TeacherServices;
  