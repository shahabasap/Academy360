import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TeacherData, teacherLogin } from '../features/teacherSlice';
import { userData, userLogin } from '../features/studentSlice';
import teacherApi from '../api/teacherApi';
import studentApi from '../api/studentApi';

function useUserData (Role:string):{user:any | null}{
    const dispatch = useDispatch();
    const role = Role;
    const teacher=useSelector(TeacherData)
    const teacherId=teacher?._id
    const student=useSelector(userData)
    const studentId =student?._id


    const [user, setUser] = useState(null);


    useEffect(() => {
      setTimeout(() => {
      
      const fetchUserData = async () => {
        
        if (role === "Teacher") {
          const teacher = await teacherApi.teacherData(teacherId);
          if (teacher.status === 200) {
            dispatch(teacherLogin(teacher.data));
            setUser(teacher.data);
          } else {
            console.log("Failed to fetch teacher data");
          }
        } else if (role === "Student") {
          const student = await studentApi.studentData(studentId);
          if (student.status === 200) {
            dispatch(userLogin(student.data));
            setUser(student.data);
          } else {
            console.log("Failed to fetch student data");
          }
        }
      };

      fetchUserData().catch(error => {
        console.error("Error fetching user data:", error);
      });
    }, 100);
  }, [role, teacherId, studentId]);
  

    return { user };
};

export default useUserData;
