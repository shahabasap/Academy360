import IStudentRepository from "../interfaces/repositoryInterfaces/IstudentRepository";
import IStudentSchema from "../types/schemaTypes/studentSchemaType";
import { BaseRepository } from "./baseRepository";
import { Model } from "mongoose";
declare class StudentRepository extends BaseRepository<IStudentSchema> implements IStudentRepository {
    constructor(model: Model<IStudentSchema>);
    findStudentById(studentId: string): Promise<IStudentSchema | null>;
    deleteUnverifiedStudent(username: string): Promise<void>;
    findStudentByUsername(username: string): Promise<IStudentSchema | null>;
    createStudent(data: {
        name: string;
        username: string;
        password: string;
    }): Promise<IStudentSchema>;
    findBlockedStudent(username: string): Promise<IStudentSchema | null>;
    findVerifiedStudent(username: string): Promise<IStudentSchema | null>;
    updatePasswordAndClearToken(studentId: string, hashedPassword: string): Promise<IStudentSchema | null>;
    setResetToken(username: string, resetToken: {
        token: string;
        expires: Date;
    }): Promise<IStudentSchema | null>;
    findStudentByResetToken(token: string): Promise<IStudentSchema | null>;
    verifyUser(email: string): Promise<IStudentSchema | null>;
}
export default StudentRepository;
