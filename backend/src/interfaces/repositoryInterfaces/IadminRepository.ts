import IAdminSchema from "../../types/schemaTypes/adminSchema";

export default interface IAdminRepository {
  createAdmin(adminData: any): Promise<IAdminSchema>;
  findByUsername(email: string): Promise<IAdminSchema | null>;
  updateAdmin(query: Record<string, any>, updations: Partial<IAdminSchema>): Promise<IAdminSchema | null>;
}
