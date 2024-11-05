import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { AuthData } from '../../features/auth/models';
import { Student } from '../../features/dashboard/students/models';
import { Router } from '@angular/router';

const mockAuthData: AuthData = {
    email: 'mocked@mail.com',
    password: '123456',
};
const mockUser: Student = {
    id: '1',
    firstName: 'Mocked',
    lastName: 'User',
    email: 'mocked@mail.com',
    password: '123456',
    token: 'mockedToken141241255225534',
    createdAt: new Date(),
    role: 'student',
};

describe('AuthService', () => {
    let service: AuthService;
    let httpController: HttpTestingController;
    let routerSpy = { navigate: jasmine.createSpy('navigate') };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,
                {
                    provide: Router,
                    useValue: routerSpy,
                },
            ],
        });
        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AuthService);
        localStorage.clear();
    });

    it('Debe ser definido el servicio', () => {
        expect(service).toBeTruthy();
    });

    it('Debe hacer login y asignar token', (done) => {
        service.login(mockAuthData).subscribe({
            next: (result) => {
                expect(result).toEqual(mockUser);
                expect(localStorage.getItem('token')).toEqual(mockUser.token);
                done();
            },
        });

        const mockReq = httpController.expectOne({
            url: `${service['BaseURL']}/students?email=${mockAuthData.email}&password=${mockAuthData.password}`,
            method: 'GET',
        });

        mockReq.flush([mockUser]);
    });

    it('Debe retornar error al hacer login invalido', (done) => {
        service.login(mockAuthData).subscribe({
            error: (err) => {
                expect(err).toBeInstanceOf(Error);
                expect(err['message']).toBe('Credenciales incorrectas');
                done();
            },
        });
        const mockReq = httpController.expectOne({
            url: `${service['BaseURL']}/students?email=${mockAuthData.email}&password=${mockAuthData.password}`,
            method: 'GET',
        });
        mockReq.flush([]);
    });

    it('Debe cerrar sesión y eliminar el token', () => {
        localStorage.setItem('token', mockUser.token);
        service.logout();
        expect(localStorage.getItem('token')).toBeNull();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['auth', 'login']);
    });

    it('Debe verificar token', (done) => {
        localStorage.setItem('token', mockUser.token);

        service.verifyToken().subscribe((isValid) => {
            expect(isValid).toBeTrue();
            done();
        });

        const mockReq = httpController.expectOne({
            url: `${service['BaseURL']}/students?token=${mockUser.token}`,
            method: 'GET',
        });

        mockReq.flush([mockUser]);
    });

    it('Debe retornar false si no hay token o es invalido', (done) => {
        localStorage.setItem('token', 'invalidToken');

        service.verifyToken().subscribe((isValid) => {
            expect(isValid).toBeFalse();
            done();
        });

        const mockReq = httpController.expectOne({
            url: `${service['BaseURL']}/students?token=invalidToken`,
            method: 'GET',
        });

        mockReq.flush([]);
    });
});

