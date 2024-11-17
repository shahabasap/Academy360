"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRepository_1 = require("./baseRepository");
class StudentRepository extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async findStudentById(studentId) {
        return await super.findOne({ _id: studentId, isBlocked: false, isVerified: true });
    }
    async deleteUnverifiedStudent(username) {
        await super.deleteOne({ username, isVerified: false });
    }
    async findStudentByUsername(username) {
        return await super.findOne({ username });
    }
    async createStudent(data) {
        const newStudent = super.create(data);
        return newStudent;
    }
    async findBlockedStudent(username) {
        return await super.findOne({ username, isBlocked: true });
    }
    async findVerifiedStudent(username) {
        return await super.findOne({ username, isBlocked: false, isVerified: true });
    }
    async updatePasswordAndClearToken(studentId, hashedPassword) {
        return await super.updateOne({ _id: studentId }, {
            password: hashedPassword,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined,
        });
    }
    async setResetToken(username, resetToken) {
        return await super.updateOne({ username: username }, { resetPasswordToken: resetToken.token, resetPasswordExpires: resetToken.expires }, { upsert: true });
    }
    async findStudentByResetToken(token) {
        return await super.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
    }
    async verifyUser(email) {
        const user = await super.findOne({ username: email });
        if (!user)
            return null;
        const updateResult = await super.updateOne({ username: email }, { $set: { isVerified: true } });
        return updateResult;
    }
}
exports.default = StudentRepository;
//# sourceMappingURL=studentRepository.js.map