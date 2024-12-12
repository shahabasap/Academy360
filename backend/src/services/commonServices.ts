import IStudentRepository from "../interfaces/repositoryInterfaces/IstudentRepository"
import ITeacherRepository from "../interfaces/repositoryInterfaces/IteacherRepository"

class CommonServices{
    private teacherRepository:ITeacherRepository
    private studentRepository:IStudentRepository
    constructor( studentRepository:IStudentRepository,teacherRepository:ITeacherRepository)
    {
      this.teacherRepository=teacherRepository
      this.studentRepository=studentRepository
    }

    async isBlockedTeacher(id:string){
        const blockChecking=await this.studentRepository.isBlockedStudent(id)
        if(blockChecking)
        {
            return true
        }
        return false
    }
    async isBlockedStudent(id:string){
        const blockChecking=await this.teacherRepository.isBlockedTeacher(id)
        if(blockChecking)
        {
            return true
        }
        return false
    }

}
export default CommonServices