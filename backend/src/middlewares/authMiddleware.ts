import { Request, Response, NextFunction } from 'express';
import JwtTokenService from '../utils/jwtTokenService';

const jwtTokenService = new JwtTokenService();

const roleTokenValidationMiddleware = (role: 'admin' | 'student' | 'teacher') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.headers['authorization']?.split(' ')[1];
            const refreshToken = req.cookies?.[`${role}Token`];

            if (!refreshToken) {
                return res.status(401).json({ token: false, message: `${role.charAt(0).toUpperCase() + role.slice(1)} token is missing. Please log in again.` });
            }

            if (!accessToken) {
                const { accessToken: newAccessToken, refreshToken: newRefreshToken, userId, role: userRole } =
                    await jwtTokenService.regenerateTokens(refreshToken);

                res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                res.cookie(`${role}Token`, newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });

                req.user = { userId, role: userRole };
                return res.status(200).json({ token: true, message: 'Token regenerated successfully.' });
            }

            try {
                const userData = await jwtTokenService.verifyAccessToken(accessToken);
                req.user = userData;
                return next();
            } catch (error) {
                if (error.message === 'Access token has expired.' || error.message === 'Invalid or malformed access token.') {
                    const { accessToken: newAccessToken, refreshToken: newRefreshToken, userId, role: userRole } =
                        await jwtTokenService.regenerateTokens(refreshToken);

                    res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                    res.cookie(`${role}Token`, newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });

                    req.user = { userId, role: userRole };
                    return res.status(200).json({ token: true, message: 'Token regenerated successfully.' });
                }

                return res.status(401).json({ token: false, message: 'Invalid access token. Please log in again.' });
            }
        } catch (error) {
            return res.status(401).json({ token: false, message: error.message });
        }
    };
};

export const adminTokenValidationMiddleware = roleTokenValidationMiddleware('admin');
export const studentTokenValidationMiddleware = roleTokenValidationMiddleware('student');
export const teacherTokenValidationMiddleware = roleTokenValidationMiddleware('teacher');
