// src/interfaces/utilInterfaces/IJwtTokenService.ts

import mongoose from "mongoose";

export default interface IJwtTokenService {
    generateToken(userId: mongoose.Types.ObjectId, role: string): Promise<{ accessToken: string; refreshToken: string }>;
    regenerateTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; userId: string; role: string }>;
    verifyAccessToken(token: string): Promise<any>; // Added verifyAccessToken
}
