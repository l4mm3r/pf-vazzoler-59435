import { Injectable } from '@angular/core';
import { AuthData } from '../../features/auth/models';
import { BehaviorSubject, Observable, of, throwError, map } from 'rxjs';
import { Student } from '../../features/dashboard/students/models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authStudent$ = new BehaviorSubject<null | Student>(null);

    public authStudent$ = this._authStudent$.asObservable();

    private BaseURL = environment.baseURL

    constructor(
        private router: Router,
        private httpClient: HttpClient,
    ) {}

    private handleAuthentication(students: Student[]): Student | null {
                    if (!!students[0]) {
                        //success
                        localStorage.setItem('token', students[0].token);
                        this._authStudent$.next(students[0]);
                        return students[0];
                    } else {
                        return null;
                    }
    }

    login(data: AuthData): Observable<Student> {
        return this.httpClient
            .get<
                Student[]
            >(`${this.BaseURL}/students?email=${data.email}&password=${data.password}`)
            .pipe(
                map((students) => {
                    const student =this.handleAuthentication(students)
                    if (student) {
                        return student;
                    } else {
                        throw throwError(() => new Error('Credenciales incorrectas'));
                    }
                })
            );
    }

    logout() {
        this._authStudent$.next(null);
        this.router.navigate(['auth', 'login']);
        localStorage.removeItem('token');
    }

    verifyToken(): Observable<boolean> {
        return this.httpClient
            .get<Student[]>(
                `${this.BaseURL}/students?token=${localStorage.getItem('token')}`
            )
            .pipe(
                map((students) => {
                    const student = this.handleAuthentication(students);
                    return !!student
                })
            )
        }
}
