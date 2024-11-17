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

  async adminSignIn(data: { username: string; password: string }) {
    const { username, password } = data;
    const admin = await this.adminRepository.findByUsername(username);

    if (admin) {
      const passwordMath = await this.passwordUtility.comparePassword(
        password,
        admin.password
      );
      if (passwordMath) {
        const { accessToken, refreshToken } =
          await this.jwtTokenService.generateToken(admin._id, admin.role);
        await this.adminRepository.updateAdmin(
          { username: username },
          { refreshToken: refreshToken }
        );

        return { success: true, accessToken };
      }
    }

    return { success: false, accesstoken: null };
  }
  async adminSignup(data: { username: string; password: string }) {
    const { username, password } = data;
    const hashedPassword = await this.passwordUtility.getHashedPassword(
      password
    );
    data.password = hashedPassword;
    const registerAdmin = await this.adminRepository.createAdmin(data);

    return registerAdmin;
  }
}

export default AdminServices;
