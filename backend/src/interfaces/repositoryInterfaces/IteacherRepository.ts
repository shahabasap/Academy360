
import mongoose from 'mongoose';
import ITeacherShema from '../../types/schemaTypes/teacherSchemaType'
interface ITeacherRepository {
  findUnblockedVerifiedTeacher(teacherId: string): Promise<ITeacherShema | null>;
  findTeacherByUsername(username: string, includeBlocked?: boolean): Promise<ITeacherShema | null>;
  removeNonverifiedTeacherByUsername(username: string): Promise<boolean>;
  createTeacher(data: { name: string; username: string; password: string }): Promise<ITeacherShema>;
  updateTeacherResetToken(teacherId: mongoose.Types.ObjectId, token: string, expires: Date): Promise<ITeacherShema | null>;
  resetTeacherPassword(token: string, hashedPassword: string): Promise<ITeacherShema | null>;
  verifyTeacher(email: string): Promise<ITeacherShema | null>;
  updateRefreshToken(email: string, refreshToken: string): Promise<ITeacherShema | null>;
}

export default ITeacherRepository;
  