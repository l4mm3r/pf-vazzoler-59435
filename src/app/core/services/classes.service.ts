import { Injectable } from '@angular/core';
import { Class } from '../../features/dashboard/classes/models';
import { delay, Observable, of, map } from 'rxjs';

export let classesDATABASE: Class[] = [
    {
        id: 'ager141',
        className: 'Programacion Orientada a Objetos',
        classCourse: 'Angular 18',
    },
    {
        id: 'ag25d21',
        className: 'Funciones',
        classCourse: 'Javascript',
    },
];

@Injectable({ providedIn: 'root' })
export class ClassesService {

    getClasses(): Observable<Class[]> {
        return of([...classesDATABASE]).pipe(delay(2000));
    }

    removeClassById(id: string): Observable<Class[]> {
        classesDATABASE = classesDATABASE.filter((classs) => classs.id !== id);

        return of(classesDATABASE);
    }

    updateClassById(id: string, update: Partial<Class>) {
        classesDATABASE = classesDATABASE.map((classs) =>
            classs.id === id ? { ...classs, ...update } : classs,
        );

        return of(classesDATABASE);
    }

    createClass(classs: Omit<Class, 'id'>): Observable<Class> {
        const classCreated = {
            ...classs,
            id: Math.random().toString(36).substr(2, 7),
        };
        classesDATABASE.push(classCreated);

        return of(classCreated);
    }
    }
