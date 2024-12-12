import { Router } from 'express';
import TeacherAuthController from '../../controllers/authController/teacherAuthController';
import TeacherServices from '../../services/teacherServices';
import JwtUtility from '../../utils/jwtTokenService';
import OtpServices from '../../services/otpService';
import PasswordUtility from '../../utils/password';
import TeacherRepository from '../../repositories/teacherRepository';
import OtpRepositoy from '../../repositories/otpRepository';
import TeacherModel from '../../models/teacherModel';
import otpModel from '../../models/otpModel';
import StudentRepository from '../../repositories/studentRepository';
import studentModel from '../../models/studentModel';
import JwtTokenService from '../../utils/jwtTokenService';

const teacherAuthRoutes = Router();
const passwordUtility=new PasswordUtility()
const jwtTokenService=new JwtTokenService()
const studentRepository=new StudentRepository(studentModel)
const teacherRepository=new TeacherRepository(TeacherModel)
const teacherServices=new TeacherServices(passwordUtility,teacherRepository,jwtTokenService)
const otpRepository=new OtpRepositoy(otpModel)
const otpService=new OtpServices(otpRepository,studentRepository,teacherRepository)
const teacherAuthController=new TeacherAuthController(teacherServices,otpService)
const {
    teacherLogin,
    teacherSignUp,
    teacherOtp,
    teacherVerifyOtp,
    teacherLogout,
    teacherForgotPassword,
    teacherResetPassword,
} = teacherAuthController;



teacherAuthRoutes.post('/login', teacherLogin.bind(teacherAuthController));
teacherAuthRoutes.post('/register', teacherSignUp.bind(teacherAuthController));
teacherAuthRoutes.post('/otp', teacherOtp.bind(teacherAuthController));
teacherAuthRoutes.post('/verify', teacherVerifyOtp.bind(teacherAuthController));
teacherAuthRoutes.get('/logout', teacherLogout.bind(teacherAuthController));
teacherAuthRoutes.post('/forgotpassword', teacherForgotPassword.bind(teacherAuthController));
teacherAuthRoutes.post('/reset-password', teacherResetPassword.bind(teacherAuthController));


export default teacherAuthRoutes