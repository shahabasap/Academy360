
export interface IOtpServices {
    sendOtp(email: string): Promise<number>;
    verifyOtp(email: string, otp: number,role:"student" |"teacher"): Promise<any>;
    generateOtp(): number;
}
