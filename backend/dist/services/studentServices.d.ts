import IStudentRepository from "../interfaces/repositoryInterfaces/IstudentRepository";
import { IStudentAuthServices } from "../interfaces/serviceInterfaces/IauthStudentServices";
import { IOtpServices } from "../interfaces/serviceInterfaces/IotpInterface";
import { IPasswordUtility } from "../interfaces/utilInterfaces/IPasswordUtility";
declare class StudentService implements IStudentAuthServices {
    private studentRepository;
    private passwordUtility;
    private otpService;
    constructor(studentRepository: IStudentRepository, passwordUtility: IPasswordUtility, otpService: IOtpServices);
    signUp(data: {
        name: string;
        username: string;
        password: string;
    }): Promise<any>;
    signIn(data: {
        username: string;
        password: string;
    }): Promise<any>;
    forgotPassword(username: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<string>;
    verifyUser(email: string): Promise<any>;
    private generateResetToken;
}
export default StudentService;
