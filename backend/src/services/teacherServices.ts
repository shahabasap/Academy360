import ITeacherRepository from "../interfaces/repositoryInterfaces/IteacherRepository";
import { ITeacherAuthServices } from "../interfaces/serviceInterfaces/IauthTeacherServices";
import IJwtTokenService from "../interfaces/utilInterfaces/IJwtTokenService";
import { IPasswordUtility } from "../interfaces/utilInterfaces/IPasswordUtility";
import { CustomErrorClass } from "../types/customError";


class TeacherServices implements ITeacherAuthServices {
    private passwordUtility: IPasswordUtility;
    private teacherRepository: ITeacherRepository;
    private jwtTokenService: IJwtTokenService;
  
    constructor(passwordUtility: IPasswordUtility, teacherRepository: ITeacherRepository, jwtTokenService: IJwtTokenService) {
      this.passwordUtility = passwordUtility;
      this.teacherRepository = teacherRepository;
      this.jwtTokenService = jwtTokenService;
    }
  
    async signUp(data: { name: string; username: string; password: string }) {
      const { username, name, password } = data;
  
      // Directly remove non-verified teachers in repository
      await this.teacherRepository.removeNonverifiedTeacherByUsername(username);
  
      const existingTeacher = await this.teacherRepository.findTeacherByUsername(username);
      if (existingTeacher) {
        throw new CustomErrorClass("Username already exists", 409);
      }
  
      const hashedPassword = await this.passwordUtility.getHashedPassword(password);
      return await this.teacherRepository.createTeacher({ ...data, password: hashedPassword });
    }
  
    async signIn(data: { username: string; password: string }) {
      const { username, password } = data;
      const teacher = await this.teacherRepository.findTeacherByUsername(username, true);
  
      if (!teacher || teacher.is_block) {
        throw new CustomErrorClass("Account not verified or blocked", 403);
      }
  
      const isPasswordValid = await this.passwordUtility.comparePassword(password, teacher.password as string);
      if (!isPasswordValid) {
        throw new CustomErrorClass("Invalid username or password", 401);
      }
  
      const { accessToken, refreshToken } = await this.jwtTokenService.generateToken(teacher._id, teacher.role);
      await this.teacherRepository.updateRefreshToken(username, refreshToken);
      return { accessToken };
    }
  
    async forgotPassword(username: string) {
      const teacher = await this.teacherRepository.findTeacherByUsername(username);
      if (!teacher) {
        throw new CustomErrorClass("Teacher not found", 404);
      }
  
      const resetToken = this.generateResetToken();
      await this.teacherRepository.updateTeacherResetToken(teacher._id, resetToken.token, resetToken.expires);
      await this.sendResetEmail(teacher.username, resetToken.token, "Teacher");
    }
  
    async resetPassword(token: string, newPassword: string) {
      const hashedPassword = await this.passwordUtility.getHashedPassword(newPassword);
      const teacher = await this.teacherRepository.resetTeacherPassword(token, hashedPassword);
      if (!teacher) {
        throw new CustomErrorClass("Token is invalid or has expired", 400);
      }
    }
  
    private generateResetToken() {
      return {
        token: "generated-token",
        expires: new Date(Date.now() + 3600000) // 1 hour from now
      };
    }
  
    private async sendResetEmail(email: string, token: string, userType: string) {
      // Logic to send email
    }
  }
  
  export default TeacherServices;
  