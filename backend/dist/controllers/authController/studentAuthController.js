"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StudentAuthController {
    authStudentServices;
    otpServices;
    jwtUtilities;
    constructor(authStudentServices, otpServices, jwtUtilities) {
        this.authStudentServices = authStudentServices;
        this.otpServices = otpServices;
        this.jwtUtilities = jwtUtilities;
    }
    async login(req, res, next) {
        try {
            const StudentData = await this.authStudentServices.signIn(req.body);
            if (StudentData && typeof StudentData !== 'string') {
                const { accessToken, refreshToken } = await this.jwtUtilities.createJwtToken(StudentData._id, StudentData.role);
                res.cookie(`access-token-${StudentData.role}`, accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 15 * 60 * 1000 // expires in 15 minutes
                });
                res.cookie(`refresh-token-${StudentData.role}`, refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // expires in 30 days
                });
            }
            res.status(201).json(StudentData);
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async signUp(req, res, next) {
        try {
            const NewStudent = await this.authStudentServices.signUp(req.body);
            res.status(201).json(NewStudent);
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async otp(req, res, next) {
        try {
            const { email } = req.body;
            await this.otpServices.sendOtp(email);
            res.status(200).send('OTP sent successfully');
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async verifyOtp(req, res, next) {
        try {
            const { email, otp } = req.body;
            const StudentData = await this.otpServices.verifyOtp(email, otp);
            if (StudentData && typeof StudentData !== 'string') {
                const { accessToken, refreshToken } = await this.jwtUtilities.createJwtToken(StudentData._id, StudentData.role);
                res.cookie(`access-token-${StudentData.role}`, accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 15 * 60 * 1000 // expires in 15 minutes
                });
                res.cookie(`refresh-token-${StudentData.role}`, refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // expires in 30 days
                });
            }
            res.status(200).json(StudentData);
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async logout(req, res, next) {
        req.logout(() => {
            res.redirect('/');
        });
    }
    async studentForgotPassword(req, res, next) {
        try {
            const student = await this.authStudentServices.forgotPassword(req.body.username);
            res.status(200).json("Reset email sent");
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async studentResetPassword(req, res, next) {
        try {
            const student = await this.authStudentServices.resetPassword(req.body.token, req.body.newPassword);
            res.status(200).json("Password reset successful");
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async studentLogout(req, res, next) {
        try {
            res.cookie('refresh-token-student', '', {
                httpOnly: true,
                expires: new Date(0)
            });
            res.cookie('access-token-student', '', {
                httpOnly: true,
                expires: new Date(0)
            });
            res.status(200).json({ message: "Student logged out" });
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
}
exports.default = StudentAuthController;
//# sourceMappingURL=studentAuthController.js.map