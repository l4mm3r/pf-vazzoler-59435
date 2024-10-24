import { Injectable } from '@angular/core';
import { Student } from '../../features/dashboard/students/models';
import { Observable, of, delay, map } from 'rxjs';

let studentsDATABASE: Student[] = [
  {
    id: 'asdf123',
    firstName: 'Edgar',
    lastName: 'Vazquez',
    email: 'l5S6v@example.com',
    createdAt: new Date(),
    password: 'admin'
  },
];

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor() {}

  getById(id: string): Observable<Student | undefined> {
    return this.getStudents().pipe(
      map((users) => users.find((user) => user.id === id)),
    );
  }

  getStudents(): Observable<Student[]> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(studentsDATABASE);
        observer.complete();
      }, 2000);
    });
  }

  removeUserById(id: string): Observable<Student[]> {
    studentsDATABASE = studentsDATABASE.filter((user) => user.id !== id);

    return of(studentsDATABASE).pipe(delay(1000));
  }

  updateUserById(id: string, update: Partial<Student>) {
    studentsDATABASE = studentsDATABASE.map((user) =>
      user.id === id ? { ...user, ...update } : user,
    );

    return new Observable<Student[]>((observer) => {
      setInterval(() => {
        observer.next(studentsDATABASE);
        observer.complete();
      }, 1000);
    });
  }
}
