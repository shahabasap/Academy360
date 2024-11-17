interface ITeacherRepository {
    findUnblockedVerifiedTeacher(teacherId: string): Promise<any>;
    findTeacherByUsername(username: string, includeBlocked?: boolean): Promise<any>;
    removeUnverifiedTeacherByUsername(username: string): Promise<any>;
    createTeacher(data: {
        name: string;
        username: string;
        password: string;
    }): Promise<any>;
    updateTeacherResetToken(teacherId: string, token: string, expires: Date): Promise<any>;
    resetTeacherPassword(token: string, hashedPassword: string): Promise<any>;
    updateTeacherVerificationStatus(email: string, isVerified: boolean): Promise<any>;
}
export default ITeacherRepository;
