import { IJwtUtility } from '../interfaces/utilInterfaces/IJwtUtillity';
declare class JwtUtility implements IJwtUtility {
    createJwtToken(userId: string, role: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
export default JwtUtility;
