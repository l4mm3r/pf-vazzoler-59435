import { Injectable } from '@angular/core';
import { Student } from '../../features/dashboard/students/models';
import { Observable, concatMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private httpClient: HttpClient) {}

  private baseURL = environment.baseURL;

  getById(id: string): Observable<Student | undefined> {
    return this.httpClient.get<Student>(`${this.baseURL}/students/${id}`)
  }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}/students`)
  }

  createStudent(data: Omit<Student, 'id'>): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseURL}/students`, {
      ...data,
      token: Math.random().toString(36).substr(2, 20),
      createdAt: new Date().toISOString(),
    })
  }


  removeUserById(id: string): Observable<Student[]> {
    return this.httpClient.delete<Student[]>(`${this.baseURL}/students/${id}`).pipe(
      concatMap(() => this.getStudents()),)
  }

  updateUserById(id: string, update: Partial<Student>) {
    return this.httpClient.patch<Student> (`${this.baseURL}/students/${id}`, update).pipe(concatMap(() => this.getStudents()));
  }
}
