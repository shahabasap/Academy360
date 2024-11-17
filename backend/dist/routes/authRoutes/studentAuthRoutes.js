"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentAuthController_1 = __importDefault(require("../../controllers/authController/studentAuthController"));
const jwtUtility_1 = __importDefault(require("../../utils/jwtUtility"));
const studentServices_1 = __importDefault(require("../../services/studentServices"));
const otpService_1 = __importDefault(require("../../services/otpService"));
const password_1 = __importDefault(require("../../utils/password"));
const studentRepository_1 = __importDefault(require("../../repositories/studentRepository"));
const otpRepository_1 = __importDefault(require("../../repositories/otpRepository"));
const studentModel_1 = __importDefault(require("../../models/studentModel"));
const otpModel_1 = __importDefault(require("../../models/otpModel"));
const studentAuthRoutes = (0, express_1.Router)();
const passwordUtility = new password_1.default();
const studentRepository = new studentRepository_1.default(studentModel_1.default);
const otpRepository = new otpRepository_1.default(otpModel_1.default);
const otpServices = new otpService_1.default(otpRepository, studentRepository);
const studentServices = new studentServices_1.default(studentRepository, passwordUtility, otpServices);
const jwtUtility = new jwtUtility_1.default();
const studentAuthController = new studentAuthController_1.default(studentServices, otpServices, jwtUtility);
studentAuthRoutes.post('/login', studentAuthController.login);
studentAuthRoutes.post('/register', studentAuthController.signUp);
studentAuthRoutes.post('/otp', studentAuthController.otp);
studentAuthRoutes.post('/student/verify', studentAuthController.verifyOtp);
studentAuthRoutes.post('/forgotpassword', studentAuthController.studentForgotPassword);
studentAuthRoutes.post('/reset-password', studentAuthController.studentResetPassword);
studentAuthRoutes.get('/logout', studentAuthController.studentLogout);
exports.default = studentAuthRoutes;
//# sourceMappingURL=studentAuthRoutes.js.map