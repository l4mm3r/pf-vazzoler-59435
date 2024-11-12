import { Class } from '../../classes/models';
import { Student } from '../../students/models';

export interface Inscription {
    id: string;
    studentId: string;
    courseId: string;
    classId: string;
    student?: Student;
    classCourse?: Class;
}
