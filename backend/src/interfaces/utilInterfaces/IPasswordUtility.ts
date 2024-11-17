// IPasswordUtility.ts
export interface IPasswordUtility {
    getHashedPassword(plainPassword: string): Promise<string>;
    comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
  }
  