import { Router } from 'express';
import StudentAuthController from '../../controllers/authController/studentAuthController';
import StudentServices from '../../services/studentServices';
import OtpServices from '../../services/otpService';
import PasswordUtility from '../../utils/password';
import StudentRepository from '../../repositories/studentRepository';
import OtpRepositoy from '../../repositories/otpRepository';
import studentModel from '../../models/studentModel';
import otpModel from '../../models/otpModel';
import TeacherRepository from '../../repositories/teacherRepository';
import TeacherModel from '../../models/teacherModel';
import JwtTokenService from '../../utils/jwtTokenService';

const studentAuthRoutes = Router();

// Initialize utilities and repositories
const passwordUtility = new PasswordUtility();
const jwtTokenService=new JwtTokenService()
const studentRepository = new StudentRepository(studentModel);
const teacherRepository=new TeacherRepository(TeacherModel)
const otpRepository = new OtpRepositoy(otpModel);
const otpServices = new OtpServices(otpRepository, studentRepository,teacherRepository);
const studentServices = new StudentServices(studentRepository, passwordUtility,jwtTokenService);

// Initialize the controller
const studentAuthController = new StudentAuthController(studentServices, otpServices);

// Bind all routes to their respective controller methods
studentAuthRoutes.post('/login', studentAuthController.login.bind(studentAuthController));
studentAuthRoutes.post('/register', studentAuthController.signUp.bind(studentAuthController));
studentAuthRoutes.post('/verify', studentAuthController.verifyOtp.bind(studentAuthController));
studentAuthRoutes.post('/forgotpassword', studentAuthController.studentForgotPassword.bind(studentAuthController));
studentAuthRoutes.post('/reset-password', studentAuthController.studentResetPassword.bind(studentAuthController));
studentAuthRoutes.get('/logout', studentAuthController.logout.bind(studentAuthController));

export default studentAuthRoutes;
