import jwt from 'jsonwebtoken';
import IJwtTokenService from '../interfaces/utilInterfaces/IJwtTokenService';
import mongoose from 'mongoose';

class JwtTokenService implements IJwtTokenService {
    // Generate Access and Refresh Tokens
    async generateToken(userId: mongoose.Types.ObjectId, role: string): Promise<{ accessToken: string; refreshToken: string }> {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

        if (!accessTokenSecret || !refreshTokenSecret) {
            throw new Error('JWT secrets are not defined in environment variables.');
        }

        const accessToken = jwt.sign(
            { userId, role },
            accessTokenSecret,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1m' }
        );

        const refreshToken = jwt.sign(
            { userId, role },
            refreshTokenSecret,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '30d' }
        );

        return { accessToken, refreshToken };
    }

    // Verify Refresh Token and Generate New Tokens
    async regenerateTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; userId: string; role: string }> {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

        if (!refreshTokenSecret) {
            throw new Error('Refresh token secret is not defined in environment variables.');
        }

        try {
            const decoded: any = jwt.verify(refreshToken, refreshTokenSecret);

            // Generate new tokens
            const { userId, role } = decoded;
            const { accessToken, refreshToken: newRefreshToken } = await this.generateToken(userId, role);

            return { accessToken, refreshToken: newRefreshToken, userId, role };
        } catch (error) {
            throw new Error('Invalid or expired refresh token.');
        }
    }

    async verifyAccessToken(token: string): Promise<any> {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

        try {
            return jwt.verify(token, accessTokenSecret);
        } catch (error) {
            throw new Error('Invalid or expired access token.');
        }
    }
}

export default JwtTokenService;
