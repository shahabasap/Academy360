import { CustomErrorClass } from "../../types/customError";
export interface IAdminAuthServices {
    AdminSignIn(data: {
        username: string;
        password: string;
    }): Promise<any | CustomErrorClass>;
}
