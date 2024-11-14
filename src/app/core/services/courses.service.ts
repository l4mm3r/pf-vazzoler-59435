import { Injectable } from '@angular/core';
import { Course } from '../../features/dashboard/courses/models';
import { Observable, concatMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CoursesService {
    constructor(private httpClient: HttpClient) {}

    private baseURL = environment.baseURL;

    getById(id: string): Observable<Course | undefined> {
        return this.httpClient.get<Course>(`${this.baseURL}/courses/${id}`);
    }

    getCourses(): Observable<Course[]> {
        return this.httpClient.get<Course[]>(`${this.baseURL}/courses`);
    }

    removeCourseById(id: string): Observable<Course[]> {
        return this.httpClient
            .delete<Course[]>(`${this.baseURL}/courses/${id}`)
            .pipe(concatMap(() => this.getCourses()));
    }

    updateCourseById(id: string, update: Partial<Course>) {
        return this.httpClient
            .patch<Course>(`${this.baseURL}/courses/${id}`, update)
            .pipe(concatMap(() => this.getCourses()));
    }

    createCourse(course: Omit<Course, 'id'>): Observable<Course> {
        return this.httpClient.post<Course>(`${this.baseURL}/courses`, course);
    }
}
