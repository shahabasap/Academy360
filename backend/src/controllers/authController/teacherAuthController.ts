import { Request, Response, NextFunction } from 'express';
import { ITeacherAuthServices } from '../../interfaces/serviceInterfaces/IauthTeacherServices';
import { IOtpServices } from '../../interfaces/serviceInterfaces/IotpInterface';
import IJwtTokenService from '../../interfaces/utilInterfaces/IJwtTokenService';



class teacherAuthController{
    private authTeacherServices:ITeacherAuthServices
    private otpServices:IOtpServices
  

    constructor(authTeacherServices:ITeacherAuthServices,otpServices:IOtpServices)
    {
        this.authTeacherServices=authTeacherServices
        this.otpServices=otpServices
      

    }
    async teacherLogin(req: Request, res: Response, next: NextFunction) {
        try {
          const teacher = await this.authTeacherServices.signIn(req.body);
        
          res.status(201).json(teacher);
  
         
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async teacherSignUp(req: Request, res: Response, next: NextFunction) {
        try {
          const{name,username,password}=req.body
          const teacher = await this.authTeacherServices.signUp(req.body);
    
          if(teacher)
            {
              await this.otpServices.sendOtp(username);
            }
          res.status(200).json(teacher);
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async teacherOtp(req: Request, res: Response, next: NextFunction) {
        try {
          const { email } = req.body;
          await this.otpServices.sendOtp(email);
          res.status(200).send('OTP sent successfully');
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async teacherVerifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
          const { email, otp,role } = req.body;
          const TeacherData = await this.otpServices.verifyOtp(email, otp,role);
          res.status(200).json(TeacherData);
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async teacherLogout(req: Request, res: Response, next: NextFunction) {
        try {
          res.cookie('access-token-teacher', '', {
            httpOnly: true,
            expires: new Date(0)
          });
          res.cookie('refresh-token-teacher', '', {
            httpOnly: true,
            expires: new Date(0)
          });
          res.status(200).json({ message: "Teacher logged out" });
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async teacherForgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
          const teacher = await this.authTeacherServices.forgotPassword(req.body.username);
          res.status(200).json("Reset email sent");
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async teacherResetPassword(req: Request, res: Response, next: NextFunction) {
        try {
          const teacher = await this.authTeacherServices.resetPassword(req.body.token, req.body.newPassword);
          res.status(200).json("Password reset successful");
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
}


export default teacherAuthController