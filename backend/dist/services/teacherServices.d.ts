import ITeacherRepository from "../interfaces/repositoryInterfaces/IteacherRepository";
import { ITeacherAuthServices } from "../interfaces/serviceInterfaces/IauthTeacherServices";
import { IPasswordUtility } from "../interfaces/utilInterfaces/IPasswordUtility";
declare class TeacherServices implements ITeacherAuthServices {
    private passwordUtility;
    private teacherRepository;
    constructor(passwordUtility: IPasswordUtility, teacherRepository: ITeacherRepository);
    signUp(data: {
        name: string;
        username: string;
        password: string;
    }): Promise<any>;
    signIn(data: {
        username: string;
        password: string;
    }): Promise<any>;
    forgotPassword(username: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    private generateResetToken;
    private sendResetEmail;
    verifyTeacher(email: string): Promise<any>;
}
export default TeacherServices;
