export interface IOtpServices {
    sendOtp(email: string): Promise<number>;
    verifyOtp(email: string, otp: string): Promise<any>;
    generateOtp(): number;
}
