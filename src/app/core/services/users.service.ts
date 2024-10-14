import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { Observable, of, delay } from 'rxjs';

let DATABASE: User[] = [
  {
    id: 'asdf123',
    firstName: 'Edgar',
    lastName: 'Vazquez',
    email: 'l5S6v@example.com',
    createdAt: new Date(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getUseres(): Observable<User[]> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(DATABASE);
        observer.complete();
      }, 2000);
    });
  }

  removeUserById(id: string): Observable<User[]> {
    DATABASE = DATABASE.filter((user) => user.id !== id);

    return of(DATABASE).pipe(delay(1000));
  }

  updateUserById(id: string, update: Partial<User>) {
    DATABASE = DATABASE.map((user) =>
      user.id === id ? { ...user, ...update } : user,
    );

    return new Observable<User[]>((observer) => {
      setInterval(() => {
        observer.next(DATABASE);
        observer.complete();
      }, 1000);
    });
  }
}
