import ITeacherRepository from "../interfaces/repositoryInterfaces/IteacherRepository";
import ITeacherShema from "../types/schemaTypes/teacherSchemaType";
import { BaseRepository } from "./baseRepository";
import { Model } from "mongoose";
declare class TeacherRepository extends BaseRepository<ITeacherShema> implements ITeacherRepository {
    constructor(model: Model<ITeacherShema>);
    findUnblockedVerifiedTeacher(teacherId: string): Promise<ITeacherShema | null>;
    findTeacherByUsername(username: string, includeBlocked?: boolean): Promise<ITeacherShema | null>;
    removeUnverifiedTeacherByUsername(username: string): Promise<void>;
    createTeacher(data: {
        name: string;
        username: string;
        password: string;
    }): Promise<ITeacherShema>;
    updateTeacherResetToken(teacherId: string, token: string, expires: Date): Promise<ITeacherShema | null>;
    resetTeacherPassword(token: string, hashedPassword: string): Promise<ITeacherShema | null>;
    updateTeacherVerificationStatus(email: string, isVerified: boolean): Promise<ITeacherShema | null>;
}
export default TeacherRepository;
