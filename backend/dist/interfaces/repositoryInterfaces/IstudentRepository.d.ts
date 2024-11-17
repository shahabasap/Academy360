interface IStudentRepository {
    findStudentById(studentId: string): Promise<any>;
    deleteUnverifiedStudent(username: string): Promise<any>;
    findStudentByUsername(username: string): Promise<any>;
    createStudent(data: {
        name: string;
        username: string;
        password: string;
    }): Promise<any>;
    findBlockedStudent(username: string): Promise<any>;
    findVerifiedStudent(username: string): Promise<any>;
    updatePasswordAndClearToken(studentId: string, hashedPassword: string): Promise<any>;
    setResetToken(username: string, resetToken: {
        token: string;
        expires: Date;
    }): Promise<any>;
    findStudentByResetToken(token: string): Promise<any>;
    verifyUser(email: string): Promise<any>;
}
export default IStudentRepository;
