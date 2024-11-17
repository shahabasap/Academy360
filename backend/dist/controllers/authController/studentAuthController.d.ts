import { Request, Response, NextFunction } from 'express';
import { IStudentAuthServices } from '../../interfaces/serviceInterfaces/IauthStudentServices';
import { IOtpServices } from '../../interfaces/serviceInterfaces/IotpInterface';
import { IJwtUtility } from '../../interfaces/utilInterfaces/IJwtUtillity';
declare class StudentAuthController {
    private authStudentServices;
    private otpServices;
    private jwtUtilities;
    constructor(authStudentServices: IStudentAuthServices, otpServices: IOtpServices, jwtUtilities: IJwtUtility);
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    signUp(req: Request, res: Response, next: NextFunction): Promise<void>;
    otp(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
    studentForgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    studentResetPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    studentLogout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default StudentAuthController;
