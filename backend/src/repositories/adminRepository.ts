import { Model } from "mongoose";
import { BaseRepository } from "./baseRepository";
import IAdminRepository from "../interfaces/repositoryInterfaces/IadminRepository";
import IAdminSchema from "../types/schemaTypes/adminSchema";

class AdminRepository extends BaseRepository<IAdminSchema> implements IAdminRepository {
  constructor(model: Model<IAdminSchema>) {
    super(model);
  }

  // Create a new admin and return the created admin document
  async createAdmin(adminData: Partial<IAdminSchema>): Promise<IAdminSchema> {
    const createdAdmin = await super.create(adminData); // Call create method of BaseRepository
    return createdAdmin; // Return the created admin document
  }

  // Find an admin by username and return the admin or null if not found
  async findByUsername(email: string): Promise<IAdminSchema | null> {
    const admin = await super.findOne({ email }); // Call findOne method of BaseRepository
    return admin; // Return the found admin or null
  }

  // Update an admin based on query and return the updated document or null if not found
  async updateAdmin(query: Record<string, any>, updations: Partial<IAdminSchema>): Promise<IAdminSchema | null> {
    const updateResult = await this.model.updateOne(query, updations); // Use updateOne to perform the update
    
    // If a document was updated, fetch the updated document and return it
    if (updateResult.modifiedCount > 0) {
      const updatedAdmin = await this.model.findOne(query); // Fetch the updated document
      return updatedAdmin; // Return the updated admin
    }

    return null; // Return null if no document was updated
  }
}

export default AdminRepository;
