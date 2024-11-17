import { Request, Response, NextFunction } from 'express';
import { ITeacherAuthServices } from '../../interfaces/serviceInterfaces/IauthTeacherServices';
import { IOtpServices } from '../../interfaces/serviceInterfaces/IotpInterface';
import { IJwtUtility } from '../../interfaces/utilInterfaces/IJwtUtillity';
declare class teacherAuthController {
    private authTeacherServices;
    private otpServices;
    private jwtUtilities;
    constructor(authTeacherServices: ITeacherAuthServices, otpServices: IOtpServices, jwtUtilities: IJwtUtility);
    teacherLogin(req: Request, res: Response, next: NextFunction): Promise<void>;
    teacherSignUp(req: Request, res: Response, next: NextFunction): Promise<void>;
    teacherOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
    teacherVerifyOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
    teacherLogout(req: Request, res: Response, next: NextFunction): Promise<void>;
    teacherForgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    teacherResetPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default teacherAuthController;
