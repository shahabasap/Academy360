"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/JwtUtility.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtUtility {
    async createJwtToken(userId, role) {
        const accessToken = jsonwebtoken_1.default.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const refreshToken = jsonwebtoken_1.default.sign({ userId, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
}
exports.default = JwtUtility;
//# sourceMappingURL=jwtUtility.js.map