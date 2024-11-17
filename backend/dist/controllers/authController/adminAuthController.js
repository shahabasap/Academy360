"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminAuthConroller {
    authAdminServices;
    jwtUtilities;
    constructor(authAdminServices, jwtUtilities) {
        this.authAdminServices = authAdminServices;
        this.jwtUtilities = jwtUtilities;
    }
    async adminLogin(req, res, next) {
        try {
            const AdminData = await this.authAdminServices.AdminSignIn(req.body);
            if (AdminData && typeof AdminData !== 'string') {
                const { accessToken, refreshToken } = await this.jwtUtilities.createJwtToken(AdminData._id, AdminData.role);
                res.cookie(`access-token-${AdminData.role}`, accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 15 * 60 * 1000 // expires in 15 minutes
                });
                res.cookie(`refresh-token-${AdminData.role}`, refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // expires in 30 days
                });
            }
            res.status(200).json(AdminData);
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
    async adminLogout(req, res, next) {
        try {
            res.cookie('refresh-token-admin', '', {
                httpOnly: true,
                expires: new Date(0)
            });
            res.cookie('access-token-admin', '', {
                httpOnly: true,
                expires: new Date(0)
            });
            res.status(200).json({ message: "Admin logged out" });
        }
        catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
}
exports.default = AdminAuthConroller;
//# sourceMappingURL=adminAuthController.js.map