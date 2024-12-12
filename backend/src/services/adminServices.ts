import envConfig from "../config/env";
import IAdminRepository from "../interfaces/repositoryInterfaces/IadminRepository";
import { IAdminAuthServices } from "../interfaces/serviceInterfaces/IauthAdminService";
import IJwtTokenService from "../interfaces/utilInterfaces/IJwtTokenService";
import { IPasswordUtility } from "../interfaces/utilInterfaces/IPasswordUtility";
import { CustomErrorClass } from "../types/customError";

class AdminServices implements IAdminAuthServices {
  private passwordUtility: IPasswordUtility;
  private jwtTokenService: IJwtTokenService;
  private adminRepository: IAdminRepository;

  constructor(
    passwordUtility: IPasswordUtility,
    jwtTokenService: IJwtTokenService,
    adminRepository: IAdminRepository
  ) {
    this.passwordUtility = passwordUtility;
    this.jwtTokenService = jwtTokenService;
    this.adminRepository = adminRepository;
  }

  async adminSignIn(data: { email: string; password: string }) {
    const { email, password } = data;
  
    const admin = await this.adminRepository.findByUsername(email);
    if (!admin) {
      throw new CustomErrorClass("Account not verified or does not exist", 403);
    }
  
    const isPasswordMatch = await this.passwordUtility.comparePassword(
      password,
      admin.password
    );
    if (!isPasswordMatch) {
      throw new CustomErrorClass("Email and password do not match", 401);
    }
  
    const { accessToken, refreshToken } = await this.jwtTokenService.generateToken(
      admin._id,
      admin.role
    );
  
    await this.adminRepository.updateAdmin(
      { username: email },
      { refreshToken }
    );
  
    return { accessToken, refreshToken };
  }
  
  async adminSignup(data: { email: string; password: string }) {
    const { email, password } = data;
    const hashedPassword = await this.passwordUtility.getHashedPassword(
      password
    );
    data.password = hashedPassword;
    const registerAdmin = await this.adminRepository.createAdmin(data);

    return registerAdmin;
  }
}

export default AdminServices;
