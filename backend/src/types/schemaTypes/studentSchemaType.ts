import mongoose from "mongoose"

export default interface IStudentSchema extends Document{
      _id :mongoose.Types.ObjectId,
      name:string,
      email:string,
      gender ?:string,
      password  :string ,
      Phone ?:number,
      Joined:Date,
      is_block:boolean,
      photo ?:string,
      is_verified:boolean,
      classrooms ?:studentClassrooms[],
      isGoogleSign?:boolean,
      resetPasswordToken?:string | null,
      resetPasswordExpires?:number |null,
      role: string,

      }   

 export type studentClassrooms={
        classroomId:string,
        IsLocked:boolean
     } 