"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../types/customError");
class StudentService {
    studentRepository;
    passwordUtility;
    otpService;
    constructor(studentRepository, passwordUtility, otpService) {
        this.studentRepository = studentRepository;
        this.passwordUtility = passwordUtility;
        this.otpService = otpService;
    }
    async signUp(data) {
        const existingStudent = await this.studentRepository.findStudentByUsername(data.username);
        if (existingStudent && existingStudent.isVerified) {
            throw new customError_1.CustomErrorClass("Username already exists", 409);
        }
        await this.studentRepository.deleteUnverifiedStudent(data.username);
        data.password = await this.passwordUtility.getHashedPassword(data.password);
        const student = await this.studentRepository.createStudent(data);
        return student;
    }
    async signIn(data) {
        const blockedStudent = await this.studentRepository.findBlockedStudent(data.username);
        if (blockedStudent)
            throw new customError_1.CustomErrorClass("Your account is blocked", 403);
        const student = await this.studentRepository.findVerifiedStudent(data.username);
        if (!student) {
            throw new customError_1.CustomErrorClass("Account not verified or does not exist", 403);
        }
        const isPasswordValid = await this.passwordUtility.comparePassword(data.password, student.password);
        if (!isPasswordValid) {
            throw new customError_1.CustomErrorClass("Email and password do not match", 401);
        }
        return student;
    }
    async forgotPassword(username) {
        const student = await this.studentRepository.findStudentByUsername(username);
        if (!student)
            throw new customError_1.CustomErrorClass("Student not found", 404);
        const resetToken = this.generateResetToken();
        await this.studentRepository.setResetToken(username, resetToken);
        // await this.otpService.sendResetEmail(username, resetToken.token, "Student");
        return "Reset password email sent successfully.";
    }
    async resetPassword(token, newPassword) {
        const student = await this.studentRepository.findStudentByResetToken(token);
        if (!student)
            throw new customError_1.CustomErrorClass("Token is invalid or has expired", 400);
        const hashedPassword = await this.passwordUtility.getHashedPassword(newPassword);
        await this.studentRepository.updatePasswordAndClearToken(student._id, hashedPassword);
        return "Password reset successfully.";
    }
    async verifyUser(email) {
        const updatedUser = await this.studentRepository.verifyUser(email);
        if (!updatedUser) {
            throw new customError_1.CustomErrorClass("Verification failed. User not found or update error.", 500);
        }
        return updatedUser;
    }
    generateResetToken() {
        const token = Math.random().toString(36).substr(2);
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiry
        return { token, expires };
    }
}
exports.default = StudentService;
//# sourceMappingURL=studentServices.js.map