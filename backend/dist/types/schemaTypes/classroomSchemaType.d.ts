import mongoose from "mongoose";
export interface IClassroomSchema extends Document {
    subject: string;
    classroomid: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    teacherid?: mongoose.Types.ObjectId;
    students?: studentData[];
    examsid?: mongoose.Types.ObjectId[];
    materialsid?: mongoose.Types.ObjectId[];
    worksid?: mongoose.Types.ObjectId[];
    announcementsid?: mongoose.Types.ObjectId[];
    Is_blocked: boolean;
}
export type studentData = {
    studentid: mongoose.Types.ObjectId;
    isVerified: boolean;
};
