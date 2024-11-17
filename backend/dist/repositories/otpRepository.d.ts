import { Model } from "mongoose";
import IOtpRepository from "../interfaces/repositoryInterfaces/IotpRepository";
import { BaseRepository } from "./baseRepository";
import IOtpSchema from "../types/schemaTypes/otpSchemaType";
declare class OtpRepositoy extends BaseRepository<IOtpSchema> implements IOtpRepository {
    constructor(model: Model<IOtpSchema>);
    createOtp(email: string, otp: number, expiresAt: Date): Promise<IOtpSchema>;
    findOtp(email: string, otp: string): Promise<IOtpSchema | null>;
    deleteOtp(email: string): Promise<number>;
}
export default OtpRepositoy;
