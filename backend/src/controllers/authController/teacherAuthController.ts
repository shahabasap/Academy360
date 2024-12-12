import { Request, Response, NextFunction } from 'express';
import { ITeacherAuthServices } from '../../interfaces/serviceInterfaces/IauthTeacherServices';
import { IOtpServices } from '../../interfaces/serviceInterfaces/IotpInterface';
import IJwtTokenService from '../../interfaces/utilInterfaces/IJwtTokenService';
import envConfig from '../../config/env';



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
          const {accessToken,refreshToken} = await this.authTeacherServices.signIn(req.body);
          
          res.cookie('teacherToken',refreshToken,{
            httpOnly:true,
            secure:envConfig.NODE_ENV=="production",
            maxAge:90*24*60*60*1000,
            sameSite:'strict'
          })
          res.status(200).json({accessToken});
         
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async teacherSignUp(req: Request, res: Response, next: NextFunction) {
        try {
          const{name,email,password}=req.body
          const teacher = await this.authTeacherServices.signUp(req.body);
    
          if(teacher)
            {
              await this.otpServices.sendOtp(email);
              res.status(200).json({success:true,message:"registration completed successfully"});
            }
        
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
          const otpNumber=Number(req.body.otp)
          const TeacherData = await this.otpServices.verifyOtp(email, otpNumber,role);
          res.status(200).json(TeacherData);
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async teacherLogout(req: Request, res: Response, next: NextFunction) {
        try {
          res.cookie('teacherToken', '', {
            httpOnly: true,
            expires: new Date(0)
          });
          
          res.status(200).json({ success:true,message: "teacher logged out" });
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async teacherForgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
          const{email}=req.body
          const teacher = await this.authTeacherServices.forgotPassword(email);
          if(teacher.success)
          {
            res.status(200).json({success:true,message:"Please check your mail,reset link on it"});
          }
         
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async teacherResetPassword(req: Request, res: Response, next: NextFunction) {
        try {
          const{token,newPassword}=req.body
          const teacher = await this.authTeacherServices.resetPassword(token,newPassword);
          if(teacher.success)
          {
            res.status(200).json({success:true,message:"Password resetted successful"});
          }
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
}


export default teacherAuthController