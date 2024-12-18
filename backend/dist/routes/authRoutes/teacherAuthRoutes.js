"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherAuthController_1 = __importDefault(require("../../controllers/authController/teacherAuthController"));
const teacherServices_1 = __importDefault(require("../../services/teacherServices"));
const jwtUtility_1 = __importDefault(require("../../utils/jwtUtility"));
const otpService_1 = __importDefault(require("../../services/otpService"));
const password_1 = __importDefault(require("../../utils/password"));
const teacherRepository_1 = __importDefault(require("../../repositories/teacherRepository"));
const otpRepository_1 = __importDefault(require("../../repositories/otpRepository"));
const teacherModel_1 = __importDefault(require("../../models/teacherModel"));
const otpModel_1 = __importDefault(require("../../models/otpModel"));
const teacherAuthRoutes = (0, express_1.Router)();
const passwordUtility = new password_1.default();
const teacherRepository = new teacherRepository_1.default(teacherModel_1.default);
const teacherServices = new teacherServices_1.default(passwordUtility, teacherRepository);
const jwtUtility = new jwtUtility_1.default();
const otpRepository = new otpRepository_1.default(otpModel_1.default);
const otpService = new otpService_1.default(otpRepository, teacherRepository);
const teacherAuthController = new teacherAuthController_1.default(teacherServices, otpService, jwtUtility);
teacherAuthRoutes.post('/login', teacherAuthController.teacherLogin);
teacherAuthRoutes.post('/register', teacherAuthController.teacherSignUp);
teacherAuthRoutes.post('/otp', teacherAuthController.teacherOtp);
teacherAuthRoutes.post('/verify', teacherAuthController.teacherVerifyOtp);
teacherAuthRoutes.get('/logout', teacherAuthController.teacherLogout);
teacherAuthRoutes.post('/forgotpassword', teacherAuthController.teacherForgotPassword);
teacherAuthRoutes.post('/reset-password', teacherAuthController.teacherResetPassword);
exports.default = teacherAuthRoutes;
//# sourceMappingURL=teacherAuthRoutes.js.map