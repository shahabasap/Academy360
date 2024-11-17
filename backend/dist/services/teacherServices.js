"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../types/customError");
class TeacherServices {
    passwordUtility;
    teacherRepository;
    constructor(passwordUtility, teacherRepository) {
        this.passwordUtility = passwordUtility;
        this.teacherRepository = teacherRepository;
    }
    async signUp(data) {
        await this.teacherRepository.removeUnverifiedTeacherByUsername(data.username);
        // await this.teacherRepository.removeOtpEntries(data.username);
        const existingTeacher = await this.teacherRepository.findTeacherByUsername(data.username);
        if (existingTeacher) {
            throw new customError_1.CustomErrorClass("Username already exists", 409);
        }
        const hashedPassword = await this.passwordUtility.getHashedPassword(data.password);
        return await this.teacherRepository.createTeacher({ ...data, password: hashedPassword });
    }
    async signIn(data) {
        const teacher = await this.teacherRepository.findTeacherByUsername(data.username, true);
        if (!teacher || teacher.Is_block) {
            throw new customError_1.CustomErrorClass("Account not verified or blocked", 403);
        }
        const isPasswordValid = await this.passwordUtility.comparePassword(data.password, teacher.password);
        if (!isPasswordValid) {
            throw new customError_1.CustomErrorClass("Invalid email or password", 401);
        }
        return teacher;
    }
    async forgotPassword(username) {
        const teacher = await this.teacherRepository.findTeacherByUsername(username);
        if (!teacher) {
            throw new customError_1.CustomErrorClass("Teacher not found", 404);
        }
        const resetToken = this.generateResetToken();
        await this.teacherRepository.updateTeacherResetToken(teacher._id, resetToken.token, resetToken.expires);
        await this.sendResetEmail(teacher.username, resetToken.token, "Teacher");
    }
    async resetPassword(token, newPassword) {
        const hashedPassword = await this.passwordUtility.getHashedPassword(newPassword);
        const teacher = await this.teacherRepository.resetTeacherPassword(token, hashedPassword);
        if (!teacher) {
            throw new customError_1.CustomErrorClass("Token is invalid or has expired", 400);
        }
    }
    generateResetToken() {
        // Logic to generate reset token
        return {
            token: "generated-token",
            expires: new Date(Date.now() + 3600000) // 1 hour from now
        };
    }
    async sendResetEmail(email, token, userType) {
        // Logic to send email
    }
    async verifyTeacher(email) {
        const teacher = await this.teacherRepository.findTeacherByUsername(email);
        if (!teacher) {
            throw new customError_1.CustomErrorClass("Teacher not found", 404);
        }
        const updateResult = await this.teacherRepository.updateTeacherVerificationStatus(email, true);
        if (updateResult.modifiedCount === 0) {
            throw new customError_1.CustomErrorClass("Failed to update verification status", 500);
        }
        const updatedTeacher = await this.teacherRepository.findTeacherByUsername(email);
        if (!updatedTeacher || !updatedTeacher.Is_verified) {
            throw new customError_1.CustomErrorClass("Verification status could not be confirmed", 500);
        }
        return updatedTeacher;
    }
}
exports.default = TeacherServices;
//# sourceMappingURL=teacherServices.js.map