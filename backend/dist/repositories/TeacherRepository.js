"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRepository_1 = require("./baseRepository");
class TeacherRepository extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async findUnblockedVerifiedTeacher(teacherId) {
        return await super.findOne({ _id: teacherId, Is_verified: true, Is_block: false });
    }
    async findTeacherByUsername(username, includeBlocked = false) {
        const filter = { username };
        if (!includeBlocked) {
            filter.Is_block = false;
        }
        return await super.findOne(filter);
    }
    async removeUnverifiedTeacherByUsername(username) {
        await super.deleteOne({ username, Is_verified: false });
    }
    async createTeacher(data) {
        const newTeacher = super.create(data);
        return newTeacher;
    }
    async updateTeacherResetToken(teacherId, token, expires) {
        return await super.updateOne({ _id: teacherId }, {
            resetPasswordToken: token,
            resetPasswordExpires: expires,
        });
    }
    async resetTeacherPassword(token, hashedPassword) {
        const teacher = await super.updateOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        }, {
            password: hashedPassword,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined
        });
        return teacher;
    }
    async updateTeacherVerificationStatus(email, isVerified) {
        return await super.updateOne({ username: email }, { $set: { Is_verified: isVerified } });
    }
}
exports.default = TeacherRepository;
//# sourceMappingURL=teacherRepository.js.map