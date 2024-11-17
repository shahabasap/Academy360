import { sendEmail } from '../utils/email';
import { CustomErrorClass } from "../types/customError";
import IOtpRepository from '../interfaces/repositoryInterfaces/IotpRepository';
import IStudentRepository from '../interfaces/repositoryInterfaces/IstudentRepository';
import ITeacherRepository from '../interfaces/repositoryInterfaces/IteacherRepository';
import { IOtpServices } from '../interfaces/serviceInterfaces/IotpInterface';
import { Request } from 'express';

class OtpServices implements IOtpServices {
  private otpRepository: IOtpRepository;
  private studentRepository: IStudentRepository;
  private teacherRepository: ITeacherRepository;

  constructor(
    otpRepository: IOtpRepository,
    studentRepository: IStudentRepository,
    teacherRepository: ITeacherRepository
  ) {
    this.otpRepository = otpRepository;
    this.studentRepository = studentRepository;
    this.teacherRepository = teacherRepository;
  }

  async sendOtp(email: string) {
    const record=await this.otpRepository.findByUsername(email)
    if (record && record.expiresAt > new Date()) {
        throw new CustomErrorClass('OTP has already been sent and is still valid', 409);
      }
    const otp = this.generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60000); // 5 minutes
    await this.otpRepository.createOtp(email, otp, expiresAt);
    await sendEmail(email, otp);

    return otp;
  }

  async verifyOtp( email: string, otp: string, role: "student" | "teacher") {
    const record = await this.otpRepository.findOtp(email, otp);

    if (!record || record.expiresAt < new Date()) {
      throw new CustomErrorClass('OTP is invalid or expired', 403);
    }

    let user;

    if (role === "teacher") {
      user = await this.teacherRepository.verifyTeacher(email);
    } else if (role === "student") {

      user = await this.studentRepository.verifyUser(email);
    }


    // Delete OTP after successful verification
    await this.otpRepository.deleteOtp(email);

    return {message:"user verified successfully"}
  }

  generateOtp = (): number => {
    return Math.floor(1000 + Math.random() * 9000);
  }
}

export default OtpServices;
