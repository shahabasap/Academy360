interface IOtpRepository {
    createOtp(email: string, otp: number, expiresAt: Date): Promise<any>;
    findOtp(email: string, otp: number): Promise<any>;
    deleteOtp(email: string): Promise<any>;
    findByUsername(email: string): Promise<any>;
  }
  
  export default IOtpRepository;
  