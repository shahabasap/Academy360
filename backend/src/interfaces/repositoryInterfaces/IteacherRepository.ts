
import mongoose from 'mongoose';
import ITeacherShema from '../../types/schemaTypes/teacherSchemaType'
interface ITeacherRepository {
  findUnblockedVerifiedTeacher(teacherId: string): Promise<ITeacherShema | null>;
  findTeacherByUsername(email: string): Promise<ITeacherShema | null>;
  removeNonverifiedTeacherByUsername(email: string): Promise<boolean>;
  createTeacher(data: { name: string; email: string; password: string }): Promise<ITeacherShema>;
  updateTeacherResetToken(teacherId: mongoose.Types.ObjectId, token: string, expires: Date): Promise<ITeacherShema | null>;
  resetTeacherPassword(token: string, hashedPassword: string): Promise<boolean>;
  verifyTeacher(email: string): Promise<ITeacherShema | null>;
  updateRefreshToken(email: string, refreshToken: string): Promise<ITeacherShema | null>;
  isBlockedTeacher(id:string): Promise<ITeacherShema | null>;
}

export default ITeacherRepository;
  