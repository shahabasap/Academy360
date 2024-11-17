import mongoose from 'mongoose';
import IStudentSchema from '../types/schemaTypes/studentSchemaType';
declare const studentModel: mongoose.Model<IStudentSchema, {}, {}, {}, mongoose.Document<unknown, {}, IStudentSchema> & IStudentSchema & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default studentModel;
