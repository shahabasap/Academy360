export default interface IOtpSchema extends Document {
    email: string;
    otp: number;
    expiresAt: Date;
}