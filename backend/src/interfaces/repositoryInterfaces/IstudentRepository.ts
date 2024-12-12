import mongoose from "mongoose";
import IStudentSchema from "../../types/schemaTypes/studentSchemaType";

interface IStudentRepository {
  findStudentById(studentId: mongoose.Types.ObjectId): Promise<IStudentSchema | null>;
  deleteNonVerifiedUser(email: string): Promise<boolean>;
  findStudentByUsername(email: string): Promise<IStudentSchema | null>;
  createStudent(data: { name: string; email: string; password: string }): Promise<IStudentSchema>;
  findBlockedStudent(email: string): Promise<IStudentSchema | null>;
  findVerifiedStudent(email: string): Promise<IStudentSchema | null>;
  updatePasswordAndClearToken(studentId: mongoose.Types.ObjectId, hashedPassword: string): Promise<boolean>;
  setResetToken(email: string, resetToken: { token: string; expires: Date }): Promise<boolean>;
  findStudentByResetToken(token: string): Promise<IStudentSchema | null>;
  verifyUser(email: string): Promise<IStudentSchema | null>;
  updateRefreshToken(email: string, refreshToken: string): Promise<boolean>;
  isBlockedStudent(id: string): Promise<IStudentSchema | null>;
}

export default IStudentRepository;
