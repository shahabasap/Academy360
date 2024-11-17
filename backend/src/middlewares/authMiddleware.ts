import { Request, Response, NextFunction } from 'express';
import JwtTokenService from '../utils/jwtTokenService ';

const jwtTokenService = new JwtTokenService();

export const tokenValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer header
        const refreshToken = req.cookies?.refreshToken; // Get refresh token from cookies

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token is missing. Please log in again.' });
        }

        if (!accessToken) {
            // If no access token, regenerate both tokens using refresh token
            const { accessToken: newAccessToken, refreshToken: newRefreshToken, userId, role } =
                await jwtTokenService.regenerateTokens(refreshToken);

            // Set new tokens in the response headers and cookies
            res.setHeader('Authorization', `Bearer ${newAccessToken}`);
            res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });

            req.user = { userId, role }; // Attach user details to request
            return next();
        }

        // Verify the access token if present
        const userData = await jwtTokenService.verifyAccessToken(accessToken);
        req.user = userData;

        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
