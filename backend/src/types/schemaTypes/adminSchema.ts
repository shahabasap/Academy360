import mongoose from "mongoose";

export default interface IAdminSchema{
    _id:mongoose.Types.ObjectId
    username:string;
    password:string;
    role:"admin";
    refreshToken?:string
}