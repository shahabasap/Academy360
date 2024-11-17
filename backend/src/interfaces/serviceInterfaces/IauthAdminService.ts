// src/interfaces/IAdminAuthServices.ts
import { CustomErrorClass } from "../../types/customError";

export interface IAdminAuthServices {
    adminSignIn(data: { username: string; password: string }): Promise<any | CustomErrorClass>;
    adminSignup(data: { username: string; password: string }): Promise<any | CustomErrorClass>;
}
