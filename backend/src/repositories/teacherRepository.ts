import { promises } from "dns";
import ITeacherRepository from "../interfaces/repositoryInterfaces/IteacherRepository";
import ITeacherShema from "../types/schemaTypes/teacherSchemaType";
import { BaseRepository } from "./baseRepository";
import mongoose,{ Model } from "mongoose";

class TeacherRepository extends BaseRepository<ITeacherShema> implements ITeacherRepository {
    constructor(model: Model<ITeacherShema>) {
        super(model);
    }

    // Find unblocked and verified teacher by teacherId
    async findUnblockedVerifiedTeacher(teacherId: string) {
        return await super.findOne({ _id: teacherId, is_verified: true, is_block: false });
    }

    // Find teacher by username with an optional check for blocked status
    async findTeacherByUsername(username: string, includeBlocked: boolean = false) {
        const filter: any = { username };
        if (!includeBlocked) {
            filter.is_block = false;
        }
        return await super.findOne(filter);
    }

    // Remove non-verified teacher by username
    async removeNonverifiedTeacherByUsername(username: string): Promise<boolean> {
        const result = await this.model.deleteOne({ username, is_verified: false });
        return result.deletedCount > 0;
    }

    // Create a new teacher entry
    async createTeacher(data: { name: string; username: string; password: string }) {
        return super.create(data);
    }
    

    // Update teacher's reset token and expiry
    async updateTeacherResetToken(teacherId: mongoose.Types.ObjectId, token: string, expires: Date) {
        return await super.updateOne({ _id: teacherId }, {
            resetPasswordToken: token,
            resetPasswordExpires: expires,
        });
    }

    // Reset teacher's password using reset token
    async resetTeacherPassword(token: string, hashedPassword: string) {
        return await super.updateOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        }, {
            password: hashedPassword,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined,
        });
    }

    // Verify a teacher by email (username)
    async verifyTeacher(email: string) {
        return await super.updateOne(
            { username: email },
            { is_verified: true }
        );
    }

    // Update teacher's refresh token
    async updateRefreshToken(email: string, refreshToken: string) {
        return await super.updateOne(
            { username: email },
            { refreshToken }
        );
    }
}

export default TeacherRepository;
