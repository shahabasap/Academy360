export default interface IadminRepo {
    adminLogin(data: {
        username: string;
        password: string;
    }): Promise<any>;
}
