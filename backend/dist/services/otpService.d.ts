import IOtpRepository from '../interfaces/repositoryInterfaces/IotpRepository';
import IStudentRepository from '../interfaces/repositoryInterfaces/IstudentRepository';
import ITeacherRepository from '../interfaces/repositoryInterfaces/IteacherRepository';
declare class OtpServices {
    private otpRepository;
    private studentRepository;
    constructor(otpRepository: IOtpRepository, studentRepository: IStudentRepository | ITeacherRepository);
    sendOtp(email: string): Promise<number>;
    verifyOtp(email: string, otp: string): Promise<true | undefined>;
    generateOtp: () => number;
}
export default OtpServices;
