import mongoose from "mongoose";
export default interface ITeacherShema extends Document {
    username: string;
    name: string;
    gender?: 'Male' | 'Female';
    phone?: number;
    password?: string;
    JoinedDate?: Date;
    classrooms?: mongoose.Schema.Types.ObjectId[];
    LastUpdation?: Date;
    Is_block: boolean;
    photo?: string;
    proof?: string;
    graduation?: graduation;
    postGraduation?: graduation;
    experiences?: experience[];
    Is_verified: boolean;
    ugCertificate?: string;
    pgCertificate?: string;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: number | null;
    isGoogleSign?: boolean;
    role: string;
    Approval: approvelType;
    Is_submit: boolean;
}
export type approvelType = {
    isApproved: boolean;
    message: String | null;
};
export type experience = {
    institute?: string;
    yearFrom?: Date;
    yearTo?: Date;
};
export type graduation = {
    college?: string;
    course?: string;
    yearFrom?: Date;
    yearTo?: Date;
};
