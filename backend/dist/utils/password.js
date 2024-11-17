"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
class PasswordUtility {
    async getHashedPassword(plainPassword) {
        const hashedPassword = await bcrypt_1.default.hash(plainPassword, saltRounds);
        return hashedPassword;
    }
    async comparePassword(plainPassword, hashedPassword) {
        const isMatch = await bcrypt_1.default.compare(plainPassword, hashedPassword);
        return isMatch;
    }
}
exports.default = PasswordUtility;
//# sourceMappingURL=password.js.map