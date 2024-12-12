import { Request, Response, NextFunction } from 'express';
import { IAdminAuthServices } from '../../interfaces/serviceInterfaces/IauthAdminService';
import IJwtTokenService from '../../interfaces/utilInterfaces/IJwtTokenService';
import envConfig from '../../config/env';


class AdminAuthConroller{
  private authAdminServices:IAdminAuthServices

    constructor(authAdminServices:IAdminAuthServices)
    {
        this.authAdminServices=authAdminServices
    

    }
    async adminLogin(req: Request, res: Response, next: NextFunction) {

        try {
          const {accessToken,refreshToken} = await this.authAdminServices.adminSignIn(req.body);
          
          res.cookie('adminToken',refreshToken,{
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
    async adminRegister(req: Request, res: Response, next: NextFunction) {

        try {
          const admin = await this.authAdminServices.adminSignup(req.body);
          if (admin) {
            res.status(200).json({success:true,message:"registration completed successfully"});
          }
       
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async adminLogout(req: Request, res: Response, next: NextFunction) {
        try {
          res.cookie('adminToken', '', {
            httpOnly: true,
            expires: new Date(0)
          });

          res.status(200).json({success:true, message: "admin logged out" });
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
}

export default AdminAuthConroller