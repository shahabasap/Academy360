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
  async deleteNonVerifiedUser(username: string): Promise<boolean> {
    const result = await this.model.deleteOne({ username, is_verified: false });
    return result.deletedCount > 0; // Returns true if a document was deleted, otherwise false
  }

  // Find student by username
  async findStudentByUsername(username: string): Promise<IStudentSchema | null> {
    return await super.findOne({ username, is_verified: true });
  }

  // Create a new student
  async createStudent(data: { name: string; username: string; password: string }): Promise<IStudentSchema> {
    return await super.create(data); // Ensure you handle promise return here
  }

  // Find blocked student by username
  async findBlockedStudent(username: string): Promise<IStudentSchema | null> {
    return await super.findOne({ username, is_block: true });
  }

  // Find verified student by username
  async findVerifiedStudent(username: string): Promise<IStudentSchema | null> {
    return await super.findOne({ username, is_block: false, is_verified: true });
  }

  // Update password and clear reset token
  async updatePasswordAndClearToken(studentId: mongoose.Types.ObjectId, hashedPassword: string): Promise<boolean> {
    const result = await this.model.updateOne(
      { _id: studentId },
      {
        password: hashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
      }
    );
    return result.modifiedCount > 0; // Return true if the document was updated
  }

  // Set reset token for student
  async setResetToken(username: string, resetToken: { token: string; expires: Date }): Promise<boolean> {
    const result = await this.model.updateOne(
      { username },
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
      { username: email },
      { refreshToken }
    );
    return result.modifiedCount > 0; // Return true if the document was updated
  }

  // Verify student by email (username)
  async verifyUser(email: string): Promise<IStudentSchema | null> {
    const user = await super.findOne({ username: email });
    if (!user) return null;

    const updateResult = await this.model.updateOne(
      { username: email },
      { $set: { is_verified: true } }
    );
    return updateResult.modifiedCount > 0 ? user : null; // Return the user if it was updated
  }
}

export default StudentRepository;
