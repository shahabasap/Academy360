import mongoose from "mongoose";
import ITeacherShema from "../types/schemaTypes/teacherSchemaType";
declare const TeacherModel: mongoose.Model<ITeacherShema, {}, {}, {}, mongoose.Document<unknown, {}, ITeacherShema> & ITeacherShema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default TeacherModel;
