declare class PasswordUtility {
    getHashedPassword(plainPassword: string): Promise<string>;
    comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
export default PasswordUtility;
