import { Request, Response, NextFunction } from 'express';
import { IStudentAuthServices } from '../../interfaces/serviceInterfaces/IauthStudentServices';
import { IOtpServices } from '../../interfaces/serviceInterfaces/IotpInterface';
import IJwtTokenService from '../../interfaces/utilInterfaces/IJwtTokenService';
import envConfig from '../../config/env';



class StudentAuthController{
    private authStudentServices:IStudentAuthServices
    private otpServices:IOtpServices


    constructor(authStudentServices:IStudentAuthServices,otpServices:IOtpServices)
    {
        this.authStudentServices=authStudentServices
        this.otpServices=otpServices
    


    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
          const {accessToken,refreshToken} = await this.authStudentServices.signIn(req.body);
          
          res.cookie('studentToken',refreshToken,{
            httpOnly:true,
            secure:envConfig.NODE_ENV=="production",
            maxAge:90*24*60*60*1000,
            sameSite:'strict'
          })
          res.status(200).json({accessToken});
          
        } catch (error) {
          next(error); 
        }
      }
    
      async signUp(req: Request, res: Response, next: NextFunction) {
        try {
          const{name,email,password}=req.body
       
          const student = await this.authStudentServices.signUp(req.body);
            
          if(student)
          {
            await this.otpServices.sendOtp(email);
            res.status(200).json({success:true,message:"registration completed successfully"});
          }
        
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async otp(req: Request, res: Response, next: NextFunction) {
        try {
          const { email } = req.body;
          await this.otpServices.sendOtp(email);
          res.status(200).send('OTP sent successfully');
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
      
          const { email, otp,role } = req.body;
          const otpNumber=parseInt(otp)
          const StudentData = await this.otpServices.verifyOtp(email, otpNumber,role);
          res.status(200).json(StudentData);
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async logout(req: Request, res: Response, next: NextFunction) {
        res.cookie('studentToken', '', {
          httpOnly: true,
          expires: new Date(0)
        });
        
        res.status(200).json({ success:true,message: "student logged out" });
      }
      
  async studentForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const {email}=req.body
      const student = await this.authStudentServices.forgotPassword(email);
      if(student.success)
      {
        res.status(200).json({success:true,message:"Please check your mail,reset link on it"});
      }
     
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  }

  async studentResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const{token,newPassword}=req.body
      const student = await this.authStudentServices.resetPassword(token,newPassword);
      if(student.success)
      {
        res.status(200).json({success:true,message:"Password resetted successful"});

      }
    
     
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  }


}


export default StudentAuthController