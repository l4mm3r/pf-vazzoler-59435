import { Injectable } from '@angular/core';
import { Class } from '../../features/dashboard/classes/models';
import { Observable, concatMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({ providedIn: 'root' })
export class ClassesService {

    constructor(private httpClient: HttpClient) {}
    baseURL = environment.baseURL

    getClasses(): Observable<Class[]> {
        return this.httpClient.get<Class[]>(`${this.baseURL}/classes`)
    }

    removeClassById(id: string): Observable<Class[]> {
        return this.httpClient.delete<Class[]>(`${this.baseURL}/classes/${id}`).pipe(concatMap(() => this.getClasses()));
    }

    updateClassById(id: string, update: Partial<Class>) {
        return this.httpClient.patch<Class> (`${this.baseURL}/classes/${id}`, update).pipe(concatMap(() => this.getClasses()));
    }

    createClass(classs: Omit<Class, 'id'>): Observable<Class> {
        return this.httpClient.post<Class>(`${this.baseURL}/classes`, classs)
    }
    }
