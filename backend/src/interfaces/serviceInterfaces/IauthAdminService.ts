// src/interfaces/IAdminAuthServices.ts
import { CustomErrorClass } from "../../types/customError";

export interface IAdminAuthServices {
    adminSignIn(data: { email: string; password: string }): Promise<any | CustomErrorClass>;
    adminSignup(data: { email: string; password: string }): Promise<any | CustomErrorClass>;
}
