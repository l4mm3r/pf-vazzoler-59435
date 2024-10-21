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
    id: 'adae234',
    courseName: 'React 19',
    courseProfessor: 'Roman Pipon',
  },
];

@Injectable({ providedIn: 'root' })
export class CoursesService {

  getCourses(): Observable<Course[]> {
    return of([...coursesDATABASE]).pipe(delay(2000));
  }

  removeCourseById(id: string): Observable<Course[]> {
    coursesDATABASE = coursesDATABASE.filter((course) => course.id !== id);

    return of(coursesDATABASE);
  }

  updateCourseById(id: string, update:Partial<Course>) {
    coursesDATABASE = coursesDATABASE.map((course) => course.id === id ? { ...course, ...update } : course);
  
    return of(coursesDATABASE);
  }


  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    const courseCreated = {
      ...course,
      id: Math.random().toString(36).substr(2, 7),
    };
    coursesDATABASE.push(courseCreated);

    return of(courseCreated);
  }
}
