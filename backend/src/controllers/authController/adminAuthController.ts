import { Request, Response, NextFunction } from 'express';
import { IAdminAuthServices } from '../../interfaces/serviceInterfaces/IauthAdminService';
import IJwtTokenService from '../../interfaces/utilInterfaces/IJwtTokenService';


class AdminAuthConroller{
  private authAdminServices:IAdminAuthServices

    constructor(authAdminServices:IAdminAuthServices)
    {
        this.authAdminServices=authAdminServices
    

    }
    async adminLogin(req: Request, res: Response, next: NextFunction) {

        try {
          const admin = await this.authAdminServices.adminSignIn(req.body);
         
       
          res.status(200).json(admin);
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    async adminRegister(req: Request, res: Response, next: NextFunction) {

        try {
          const admin = await this.authAdminServices.adminSignup(req.body);
         
       
          res.status(200).json(admin);
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
    
      async adminLogout(req: Request, res: Response, next: NextFunction) {
        try {
          res.cookie('refresh-token-admin', '', {
            httpOnly: true,
            expires: new Date(0)
          });
          res.cookie('access-token-admin', '', {
            httpOnly: true,
            expires: new Date(0)
          });
          res.status(200).json({ message: "Admin logged out" });
        } catch (error) {
          next(error); // Pass the error to the error-handling middleware
        }
      }
}

export default AdminAuthConroller