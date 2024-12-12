import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

interface EnvConfig {
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    ADMIN_EMAIL:string;
    ADMIN_PASSWORD:string;
    PORT:string;
    Mongo_URL:string;
    ACCESS_TOKEN_SECRET:string;
    REFRESH_TOKEN_SECRET:string;
    ACCESS_TOKEN_EXPIRY:string;
    REFRESH_TOKEN_EXPIRY:string;
    NODE_ENV :string;
    Frontend_URL:string;
}

// Create the config object by pulling values from environment variables
const envConfig: EnvConfig = {
    EMAIL_HOST: process.env.EMAIL_HOST as string,
    EMAIL_PORT: parseInt(process.env.EMAIL_PORT as string, 10), // Convert to number
    EMAIL_USER: process.env.EMAIL_USER as string,
    EMAIL_PASS: process.env.EMAIL_PASS as string,
    ADMIN_EMAIL:process.env.ADMIN_EMAIL as string,
    ADMIN_PASSWORD:process.env.ADMIN_PASSWORD as string,
    PORT:process.env.PORT as string,
    Mongo_URL:process.env.Mongo_URL as string,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET as string,
    ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY as string,
    REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY as string,
    NODE_ENV :process.env.NODE_ENV  as string,
    Frontend_URL:process.env.Frontend_URL as string

 
};

// Log loaded environment variables for debugging
console.log("Environment Variables Loaded:", envConfig);

// Ensure that all necessary environment variables are set
if ( !envConfig.EMAIL_USER || !envConfig.EMAIL_PASS ) {
    throw new Error("Missing required environment variables");
}

export default envConfig;