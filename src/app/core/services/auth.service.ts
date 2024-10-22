import { Injectable } from '@angular/core';
import { AuthData } from '../../features/auth/models';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Student } from '../../features/dashboard/students/models';

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


    login(data: AuthData): Observable<Student> {
        if (data.email != FAKE_STUDENT.email || data.password != FAKE_STUDENT.password) {
            return throwError(() => new Error('Credenciales invalidas'));
        }

        this._authStudent$.next(FAKE_STUDENT);
        return of(FAKE_STUDENT);
    }
}