import mongoose,{Schema} from 'mongoose'
import IStudentSchema from '../types/schemaTypes/studentSchemaType';


const studentSchema:Schema=new Schema({
    name:{type:String,require:true},
    password:{type:String,required:false},
    username:{type:String,require:true},
    gender:{type:String,require:false},
    phone:{type:Number,require:false},
    Joined: { type: Date, default: Date.now },
    is_block:{type:Boolean,default:false},
    photo:{type:String,require:false},
    is_verified:{type:Boolean,default:false},
    classrooms:[
        {
       classroomId: {type:mongoose.Schema.Types.ObjectId,ref:'Classroom'},
        IsLocked:{type:Boolean,default:true}
    }
    ],
    isGoogleSign: {type:String,default:false,require:false},
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
    role:{type:String,default:"student"},
    refreshToken: { type: String, required: false }
    
})

const studentModel=mongoose.model<IStudentSchema>('Student',studentSchema)
export default studentModel;