import mongoose, { Document, Schema } from 'mongoose';
import IOtpSchema from '../types/schemaTypes/otpSchemaType';



const OtpSchema = new Schema<IOtpSchema>({
    email: { type: String, required: true },
    otp: { type: Number, required: true },
    expiresAt: { type: Date, required: true }
});

// Create a TTL index on the expiresAt field
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 300 }); // 300 seconds = 5 minutes

export default mongoose.model<IOtpSchema>('Otp', OtpSchema);
