interface EnvConfig {
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    PORT: string;
}
declare const envConfig: EnvConfig;
export default envConfig;
