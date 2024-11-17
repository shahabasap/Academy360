export interface IJwtUtility {
    createJwtToken(userId: string, role: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
