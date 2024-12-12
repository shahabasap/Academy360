import mongoose, { Model } from "mongoose";
import IStudentRepository from "../interfaces/repositoryInterfaces/IstudentRepository";
import IStudentSchema from "../types/schemaTypes/studentSchemaType";
import { BaseRepository } from "./baseRepository";

class StudentRepository extends BaseRepository<IStudentSchema> implements IStudentRepository {
  constructor(model: Model<IStudentSchema>) {
    super(model);
  }

  // Find a student by ID
  async findStudentById(studentId: mongoose.Types.ObjectId): Promise<IStudentSchema | null> {
    return await super.findOne({ _id: studentId, is_block: false, is_verified: true });
  }

  // Delete non-verified student by username
  async deleteNonVerifiedUser(email: string): Promise<boolean> {
    const result = await this.model.deleteOne({ email, is_verified: false });
    return result.deletedCount > 0; // Returns true if a document was deleted, otherwise false
  }

  // Find student by username
  async findStudentByUsername(email: string): Promise<IStudentSchema | null> {
    return await super.findOne({ email, is_verified: true });
  }

  // Create a new student
  async createStudent(data: { name: string; email: string; password: string }): Promise<IStudentSchema> {
    return await super.create(data); // Ensure you handle promise return here
  }

  // Find blocked student by username
  async findBlockedStudent(email: string): Promise<IStudentSchema | null> {
    return await super.findOne({ email, is_block: true });
  }

  // Find verified student by username
  async findVerifiedStudent(email: string): Promise<IStudentSchema | null> {
    return await super.findOne({ email, is_block: false, is_verified: true });
  }

  // Update password and clear reset token
  async updatePasswordAndClearToken(studentId: mongoose.Types.ObjectId, hashedPassword: string): Promise<boolean> {
    const result = await this.model.updateOne(
      { _id: studentId },
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      }
    );
    return result.modifiedCount > 0; // Return true if the document was updated
  }

  // Set reset token for student
  async setResetToken(email: string, resetToken: { token: string; expires: Date }): Promise<boolean> {
    const result = await this.model.updateOne(
      { email },
      { resetPasswordToken: resetToken.token, resetPasswordExpires: resetToken.expires },
      { upsert: true }
    );
    return result.upsertedCount > 0 || result.modifiedCount > 0; // Return true if the operation was successful
  }

  // Find student by reset token
  async findStudentByResetToken(token: string): Promise<IStudentSchema | null> {
    return await super.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  // Update refresh token for student
  async updateRefreshToken(email: string, refreshToken: string): Promise<boolean> {
    const result = await this.model.updateOne(
      { email },
      { refreshToken }
    );
    return result.modifiedCount > 0; // Return true if the document was updated
  }

  // Verify student by email (username)
  async verifyUser(email: string): Promise<IStudentSchema | null> {
    const user = await super.findOne({ email });
    if (!user) return null;

    const updateResult = await this.model.updateOne(
      {  email },
      { $set: { is_verified: true } }
    );
    return updateResult.modifiedCount > 0 ? user : null; // Return the user if it was updated
  }
  async isBlockedStudent(id: string): Promise<IStudentSchema | null> {
    const user = await super.findOne({ _id:id });
    if (!user) return null;

 
    return user
  }
}

export default StudentRepository;
