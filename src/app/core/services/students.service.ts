import { Injectable } from '@angular/core';
import { Student } from '../../features/dashboard/students/models';
import { Observable, of, delay, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

let studentsDATABASE: Student[] = [
  {
    id: 'asdf123',
    firstName: 'Edgar',
    lastName: 'Vazquez',
    email: 'l5S6v@example.com',
    createdAt: new Date(),
    password: 'admin',
    token: 'as4124a123aag325v',
    role: 'admin',
  },
];

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private httpClient: HttpClient) {}

  private baseURL = environment.baseURL;

  getById(id: string): Observable<Student | undefined> {
    return this.getStudents().pipe(
      map((students) => students.find((students) => students.id === id)),
    );
  }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}/students`)
  }

  createStudent(data: Omit<Student, 'id'>): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseURL}/students`, {
      ...data,
      token: Math.random().toString(36).substr(2, 7),
      createdAt: new Date().toISOString(),
    })
  }


  removeUserById(id: string): Observable<Student[]> {
    return this.httpClient.delete<Student[]>(`${this.baseURL}/students/${id}`)
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
