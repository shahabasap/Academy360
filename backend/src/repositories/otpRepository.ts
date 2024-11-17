import { Model } from "mongoose";
import IOtpRepository from "../interfaces/repositoryInterfaces/IotpRepository";
import ITeacherShema from "../types/schemaTypes/teacherSchemaType";
import { BaseRepository } from "./baseRepository";
import IOtpSchema from "../types/schemaTypes/otpSchemaType";

class OtpRepositoy extends BaseRepository<IOtpSchema> implements IOtpRepository{
    constructor(model:Model<IOtpSchema>)
    {
      super(model)
    }
    async createOtp(email: string, otp: number, expiresAt: Date) {
 
             return await super.create({ email, otp, expiresAt });
     
      }
      
    
      async findOtp(email: string, otp: string) {
    
          const otpCheck= await super.findOne({ email, otp });
          return otpCheck
       
      }
      async findByUsername(email: string) {
    
          const otpCheck= await super.findOne({ email});
          return otpCheck
       
      }
    
      async deleteOtp(email: string) {

          return await super.deleteMany({ email });
       
      }
}
export default OtpRepositoy