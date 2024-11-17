import mongoose from "mongoose";
import IStudentSchema from "../../types/schemaTypes/studentSchemaType";

interface IStudentRepository {
  findStudentById(studentId: mongoose.Types.ObjectId): Promise<IStudentSchema | null>;
  deleteNonVerifiedUser(username: string): Promise<boolean>;
  findStudentByUsername(username: string): Promise<IStudentSchema | null>;
  createStudent(data: { name: string; username: string; password: string }): Promise<IStudentSchema>;
  findBlockedStudent(username: string): Promise<IStudentSchema | null>;
  findVerifiedStudent(username: string): Promise<IStudentSchema | null>;
  updatePasswordAndClearToken(studentId:  mongoose.Types.ObjectId, hashedPassword: string): Promise<boolean>;
  setResetToken(username: string, resetToken: { token: string; expires: Date }): Promise<boolean>;
  findStudentByResetToken(token: string): Promise<IStudentSchema | null>;
  verifyUser(email: string): Promise<IStudentSchema | null>;
  updateRefreshToken(email: string, refreshToken: string): Promise<boolean>;
}

export default IStudentRepository;
