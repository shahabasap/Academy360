import mongoose from 'mongoose';
import IOtpSchema from '../types/schemaTypes/otpSchemaType';
declare const _default: mongoose.Model<IOtpSchema, {}, {}, {}, mongoose.Document<unknown, {}, IOtpSchema> & IOtpSchema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
