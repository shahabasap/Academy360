"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class teacherAuthController {
    authTeacherServices;
    otpServices;
    jwtUtilities;
    constructor(authTeacherServices, otpServices, jwtUtilities) {
        this.authTeacherServices = authTeacherServices;
        this.otpServices = otpServices;
        this.jwtUtilities = jwtUtilities;
    }
    async teacherLogin(req, res, next) {
        try {
            const TeacherData = await this.authTeacherServices.signIn(req.body);
            if (TeacherData && typeof TeacherData !== 'string') {
                const { accessToken, refreshToken } = await this.jwtUtilities.createJwtToken(TeacherData._id, TeacherData.role);
                res.cookie(`access-token-${TeacherData.role}`, accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 15 * 60 * 1000 // expires in 15 minutes
                });
                res.cookie(`refresh-token-${TeacherData.role}`, refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // expires in 30 days
                });
            }
            res.status(201).json(TeacherData);
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async teacherSignUp(req, res, next) {
        try {
            const NewTeacher = await this.authTeacherServices.signUp(req.body);
            res.status(200).json(NewTeacher);
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async teacherOtp(req, res, next) {
        try {
            const { email } = req.body;
            await this.otpServices.sendOtp(email);
            res.status(200).send('OTP sent successfully');
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async teacherVerifyOtp(req, res, next) {
        try {
            const { email, otp } = req.body;
            const TeacherData = await this.otpServices.verifyOtp(email, otp);
            if (TeacherData && typeof TeacherData !== 'string') {
                const { accessToken, refreshToken } = await this.jwtUtilities.createJwtToken(TeacherData._id, TeacherData.role);
                res.cookie(`access-token-${TeacherData.role}`, accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 15 * 60 * 1000 // expires in 15 minutes
                });
                res.cookie(`refresh-token-${TeacherData.role}`, refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // expires in 30 days
                });
            }
            res.status(200).json(TeacherData);
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async teacherLogout(req, res, next) {
        try {
            res.cookie('access-token-teacher', '', {
                httpOnly: true,
                expires: new Date(0)
            });
            res.cookie('refresh-token-teacher', '', {
                httpOnly: true,
                expires: new Date(0)
            });
            res.status(200).json({ message: "Teacher logged out" });
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async teacherForgotPassword(req, res, next) {
        try {
            const teacher = await this.authTeacherServices.forgotPassword(req.body.username);
            res.status(200).json("Reset email sent");
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async teacherResetPassword(req, res, next) {
        try {
            const teacher = await this.authTeacherServices.resetPassword(req.body.token, req.body.newPassword);
            res.status(200).json("Password reset successful");
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
}
exports.default = teacherAuthController;
//# sourceMappingURL=teacherAuthController.js.map