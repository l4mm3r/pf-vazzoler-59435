import { Injectable } from '@angular/core';
import { AuthData } from '../../features/auth/models';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Student } from '../../features/dashboard/students/models';
import { Router } from '@angular/router';

const FAKE_STUDENT: Student = {
    email: 'admin@mail.com',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'Admin',
    id: 'asdf123',
    createdAt: new Date(),
}


@Injectable({ providedIn: 'root' }) export class AuthService {

    private _authStudent$ = new BehaviorSubject<null | Student>(null);
    
    public authStudent$ = this._authStudent$.asObservable();

    constructor(private router: Router) { }

    login(data: AuthData): Observable<Student> {
        if (data.email != FAKE_STUDENT.email || data.password != FAKE_STUDENT.password) {
            return throwError(() => new Error('Credenciales invalidas'));
        }

        this._authStudent$.next(FAKE_STUDENT);
        return of(FAKE_STUDENT);
    }

    logout() {
        this._authStudent$.next(null);
        this.router.navigate(['auth', 'login']);
    }
}