import { IAdminAuthServices } from "../interfaces/serviceInterfaces/IauthAdminService";
import { IPasswordUtility } from "../interfaces/utilInterfaces/IPasswordUtility";
declare class AdminServices implements IAdminAuthServices {
    private passwordUtility;
    constructor(passwordUtility: IPasswordUtility);
    AdminSignIn(data: {
        username: string;
        password: string;
    }): Promise<boolean>;
}
export default AdminServices;
