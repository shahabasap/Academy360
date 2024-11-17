import mongoose, { Types } from 'mongoose';
import { IClassroomSchema } from '../types/schemaTypes/classroomSchemaType';
declare const classroomModel: mongoose.Model<IClassroomSchema, {}, {}, {}, mongoose.Document<unknown, {}, IClassroomSchema> & IClassroomSchema & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export default classroomModel;
