interface IOtpRepository {
    createOtp(email: string, otp: number, expiresAt: Date): Promise<any>;
    findOtp(email: string, otp: string): Promise<any>;
    deleteOtp(email: string): Promise<any>;
    findByUsername(email: string): Promise<any>;
  }
  
  export default IOtpRepository;
  