import { Request, Response, NextFunction } from 'express';
import { IStudentAuthServices } from '../../interfaces/serviceInterfaces/IauthStudentServices';
import { IOtpServices } from '../../interfaces/serviceInterfaces/IotpInterface';
import IJwtTokenService from '../../interfaces/utilInterfaces/IJwtTokenService';



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
          const student = await this.authStudentServices.signIn(req.body);
          
         res.status(201).json(student)
        } catch (error) {
          next(error); 
        }
      }
    
      async signUp(req: Request, res: Response, next: NextFunction) {
        try {
          const{name,username,password}=req.body
       
          const student = await this.authStudentServices.signUp(req.body);
            
          if(student)
          {
            await this.otpServices.sendOtp(username);
          }
          res.status(201).json(student);
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
          const StudentData = await this.otpServices.verifyOtp(email, otp,role);
          res.status(200).json(StudentData);
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async logout(req: Request, res: Response, next: NextFunction) {
        req.logout(() => {
          res.redirect('/');
        });
      }
      
  async studentForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await this.authStudentServices.forgotPassword(req.body.username);
      res.status(200).json("Reset email sent");
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  }

  async studentResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await this.authStudentServices.resetPassword(req.body.token, req.body.newPassword);
      res.status(200).json("Password reset successful");
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  }

  async studentLogout(req: Request, res: Response, next: NextFunction) {
    try {
      res.cookie('refresh-token-student', '', {
        httpOnly: true,
        expires: new Date(0)
      });
      res.cookie('access-token-student', '', {
        httpOnly: true,
        expires: new Date(0)
      });
      res.status(200).json({ message: "Student logged out" });
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  }
}


export default StudentAuthController