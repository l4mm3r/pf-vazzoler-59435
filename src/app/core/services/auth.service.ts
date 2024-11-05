import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthData } from '../../features/auth/models';
import { Student } from '../../features/dashboard/students/models';
import { AuthActions } from '../../store/actions/auth.actions';
import { selectAuthenticatedStudent } from '../../store/selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthService {
    // private _authStudent$ = new BehaviorSubject<null | Student>(null);
    public authStudent$: Observable<Student | null>;
    private BaseURL = environment.baseURL;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private store: Store,
    ) {
        this.authStudent$ = this.store.select(selectAuthenticatedStudent);
    }

    private handleAuthentication(students: Student[]): Student | null {
        if (!!students[0]) {
            localStorage.setItem('token', students[0].token);
            this.store.dispatch(
                AuthActions.setAuthenticatedStudent({ student: students[0] }),
            );
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
                    const student = this.handleAuthentication(students);
                    if (student) {
                        return student;
                    } else {
                        throw new Error('Credenciales incorrectas');
                    }
                }),
            );
    }

    logout() {
        // this._authStudent$.next(null);
        this.store.dispatch(AuthActions.unsetAuthenticatedStudent()),
            this.router.navigate(['auth', 'login']);
        localStorage.removeItem('token');
    }

    verifyToken(): Observable<boolean> {
        return this.httpClient
            .get<
                Student[]
            >(`${this.BaseURL}/students?token=${localStorage.getItem('token')}`)
            .pipe(
                map((students) => {
                    const student = this.handleAuthentication(students);
                    return !!student;
                }),
            );
    }

}
