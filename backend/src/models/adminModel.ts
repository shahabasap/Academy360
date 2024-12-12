import mongoose,{Document,Schema} from 'mongoose'
import IAdminSchema from '../types/schemaTypes/adminSchema';

const AdminSchema:Schema=new Schema({
    email:{type:String,require:true},
    password:{type:String,required:true},
    role: { type: String, default: "admin" },
    refreshToken: { type: String, required: false,default:null }
    
})

const adminModel=mongoose.model<IAdminSchema>('Admin',AdminSchema)
export default adminModel;