"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRepository_1 = require("./baseRepository");
class OtpRepositoy extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async createOtp(email, otp, expiresAt) {
        return await super.create({ email, otp, expiresAt });
    }
    async findOtp(email, otp) {
        const otpCheck = await super.findOne({ email, otp });
        return otpCheck;
    }
    async deleteOtp(email) {
        return await super.deleteMany({ email });
    }
}
exports.default = OtpRepositoy;
//# sourceMappingURL=otpRepository.js.map