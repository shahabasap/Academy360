import IStudentRepository from "../interfaces/repositoryInterfaces/IstudentRepository";
import { IStudentAuthServices } from "../interfaces/serviceInterfaces/IauthStudentServices";
import IJwtTokenService from "../interfaces/utilInterfaces/IJwtTokenService";
import { IPasswordUtility } from "../interfaces/utilInterfaces/IPasswordUtility";
import { CustomErrorClass } from "../types/customError";
import { sendResetPasswordEmail } from "../utils/email";

class StudentService implements IStudentAuthServices {
  private studentRepository: IStudentRepository;
  private passwordUtility: IPasswordUtility;
  private jwtTokenService:IJwtTokenService
  private role='student'


  constructor(
    studentRepository: IStudentRepository,
    passwordUtility: IPasswordUtility,
    jwtTokenService:IJwtTokenService

  ) {
    this.studentRepository = studentRepository;
    this.passwordUtility = passwordUtility;
    this.jwtTokenService=jwtTokenService

  }

  async signUp(data: { name: string; email: string; password: string }) {
    const {email,password}=data
    const existingStudent = await this.studentRepository.findStudentByUsername(email);
    if (existingStudent) {
      throw new CustomErrorClass("Username already exists", 400);
    }

    await this.studentRepository.deleteNonVerifiedUser(email);

    data.password = await this.passwordUtility.getHashedPassword(password);
    const student = await this.studentRepository.createStudent(data);
    return student;
  }

  async signIn(data: { email: string; password: string }) {
    const{email,password}=data
    const blockedStudent = await this.studentRepository.findBlockedStudent(email);
    if (blockedStudent) throw new CustomErrorClass("Your account is blocked", 403);

    const student = await this.studentRepository.findVerifiedStudent(email);
    if (!student) {
      throw new CustomErrorClass("Account not verified or does not exist", 403);
    }

    const isPasswordValid = await this.passwordUtility.comparePassword(password, student.password);
    if (!isPasswordValid) {
      throw new CustomErrorClass("Email and password do not match", 401);
    }
    const{accessToken,refreshToken}=await this.jwtTokenService.generateToken(student._id,student.role)
  

    return {accessToken,refreshToken};
  }

  async forgotPassword(email: string) {
    const student = await this.studentRepository.findStudentByUsername(email);
    if (!student) throw new CustomErrorClass("Student not found", 404);

    const resetToken = this.generateResetToken();
    await this.studentRepository.setResetToken(email, resetToken);

    await sendResetPasswordEmail(email,this.role,resetToken.token)
    return {success:true};
  }

  async resetPassword(token: string, newPassword: string) {
    const student = await this.studentRepository.findStudentByResetToken(token);
    if (!student) throw new CustomErrorClass("Token is invalid or has expired", 400);

    const hashedPassword = await this.passwordUtility.getHashedPassword(newPassword);
    await this.studentRepository.updatePasswordAndClearToken(student._id, hashedPassword);
    return {success:true}
  }


  private generateResetToken() {
    const token = Math.random().toString(36).substr(2);
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiry
    return { token, expires };
  }
}

export default StudentService;
