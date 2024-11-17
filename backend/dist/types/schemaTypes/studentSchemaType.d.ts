export default interface IStudentSchema extends Document {
    _id?: string;
    name: string;
    username: string;
    gender?: string;
    password?: string;
    Phone?: number;
    Joined: Date;
    Is_block: boolean;
    photo?: string;
    is_verified: boolean;
    classrooms?: studentClassrooms[];
    isGoogleSign?: boolean;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: number | null;
    role: string;
}
export type studentClassrooms = {
    classroomId: string;
    IsLocked: boolean;
};
