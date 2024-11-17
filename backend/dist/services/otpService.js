"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_1 = require("../utils/email");
const customError_1 = require("../types/customError");
class OtpServices {
    otpRepository;
    studentRepository;
    constructor(otpRepository, studentRepository) {
        this.otpRepository = otpRepository;
        this.studentRepository = studentRepository;
    }
    async sendOtp(email) {
        const otp = this.generateOtp();
        const expiresAt = new Date(Date.now() + 5 * 60000); // 5 minutes
        await this.otpRepository.createOtp(email, otp, expiresAt);
        await (0, email_1.sendEmail)(email, otp);
        return otp;
    }
    async verifyOtp(email, otp) {
        const record = await this.otpRepository.findOtp(email, otp);
        if (!record || record.expiresAt < new Date()) {
            throw new customError_1.CustomErrorClass('OTP is invalid or expired', 403);
        }
        if (record) {
            await this.otpRepository.deleteOtp(email); // Move delete here to ensure it's deleted after successful verification
            return true;
        }
    }
    generateOtp = () => {
        return Math.floor(1000 + Math.random() * 9000);
    };
}
exports.default = OtpServices;
//# sourceMappingURL=otpService.js.map