export default interface CustomError extends Error {
    status?: number;
    message: string;
}
export declare class CustomErrorClass extends Error {
    status?: number;
    constructor(message: string, status?: number);
}
