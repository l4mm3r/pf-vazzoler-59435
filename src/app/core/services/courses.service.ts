import { Injectable } from '@angular/core';
import { Course } from '../../features/dashboard/courses/models';
import { Observable, of, delay, map } from 'rxjs';

let coursesDATABASE: Course[] = [
  {
    id: 'adae134',
    courseName: 'Angular 18',
    courseProfessor: 'Miguel Angel Duran',
  },
  {
    id: 'adae134',
    courseName: 'React 19',
    courseProfessor: 'Roman Pipon',
  },
];

@Injectable({ providedIn: 'root' })
export class CoursesService {
  getCourses(): Observable<Course[]> {
    return of([...coursesDATABASE]);
  }
}
