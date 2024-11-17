import { Request, Response, NextFunction } from 'express';
import { IAdminAuthServices } from '../../interfaces/serviceInterfaces/IauthAdminService';
import { IJwtUtility } from '../../interfaces/utilInterfaces/IJwtUtillity';
declare class AdminAuthConroller {
    private authAdminServices;
    private jwtUtilities;
    constructor(authAdminServices: IAdminAuthServices, jwtUtilities: IJwtUtility);
    adminLogin(req: Request, res: Response, next: NextFunction): Promise<void>;
    adminLogout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default AdminAuthConroller;
