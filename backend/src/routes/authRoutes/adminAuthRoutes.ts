import { Router } from 'express';
import AdminAuthController from '../../controllers/authController/adminAuthController';
import AdminServices from '../../services/adminServices';
import JwtTokenService from '../../utils/jwtTokenService ';
import PasswordUtility from '../../utils/password';
import AdminRepository from '../../repositories/adminRepository';
import adminModel from '../../models/adminModel';

const adminAuthRoutes = Router();

const passwordUtility = new PasswordUtility();
const jwtTokenService = new JwtTokenService();
const adminRepository=new AdminRepository(adminModel)
const adminServices = new AdminServices(passwordUtility,jwtTokenService,adminRepository);
const adminAuthController = new AdminAuthController(adminServices);

// Bind all methods of the controller instance
const { adminLogin, adminLogout,adminRegister } = adminAuthController;

adminAuthRoutes.post('/login', adminLogin.bind(adminAuthController));
adminAuthRoutes.post('/register', adminRegister.bind(adminAuthController));
adminAuthRoutes.get('/logout', adminLogout.bind(adminAuthController));

export default adminAuthRoutes;
