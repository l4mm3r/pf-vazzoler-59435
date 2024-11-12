import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { Action } from '@ngrx/store';
import { StudentsService } from '../../../../core/services/students.service';
import { ClassesService } from '../../../../core/services/classes.service';
import { CoursesService } from '../../../../core/services/courses.service';

@Injectable()
export class InscriptionEffects {
    loadInscriptions$: Actions<Action<string>>;
    createInscription$: Actions<Action<string>>;
    createInscriptionSuccess$: Actions<Action<string>>;
    loadInscriptionsOptions$: Actions<Action<string>>;

    constructor(
        private actions$: Actions,
        private inscriptionService: InscriptionsService,
        private studentService: StudentsService,
        private classesService: ClassesService,
        private coursesService: CoursesService,
    ) {
        (this.loadInscriptions$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(InscriptionActions.loadInscriptions),
                concatMap(() =>
                    this.inscriptionService.getInscriptions().pipe(
                        map((response) =>
                            InscriptionActions.loadInscriptionSuccess({
                                data: response,
                            }),
                        ),
                        catchError((error) =>
                            of(
                                InscriptionActions.loadInscriptionFailure({
                                    error,
                                }),
                            ),
                        ),
                    ),
                ),
            );
        })),
            (this.createInscription$ = createEffect(() => {
                return this.actions$.pipe(
                    ofType(InscriptionActions.createInscription),
                    concatMap((action) =>
                        this.inscriptionService
                            .createInscription({
                                courseId: action.courseId,
                                studentId: action.studentId,
                                classId: action.classId,
                            })
                            .pipe(
                                map((data) =>
                                    InscriptionActions.createInscriptionSuccess(
                                        {
                                            data,
                                        },
                                    ),
                                ),
                                catchError((error) =>
                                    of(
                                        InscriptionActions.createInscriptionFailure(
                                            { error },
                                        ),
                                    ),
                                ),
                            ),
                    ),
                );
            }));

        this.createInscriptionSuccess$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(InscriptionActions.createInscriptionSuccess),
                map(() => InscriptionActions.loadInscriptions()),
            );
        });

        this.loadInscriptionsOptions$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(InscriptionActions.loadOptions),
                concatMap(() =>
                    forkJoin([
                        this.coursesService.getCourses(),
                        this.studentService.getStudents(),
                        this.classesService.getClasses(),
                    ]).pipe(
                        map((response) =>
                            InscriptionActions.loadOptionsSuccess({
                                courses: response[0],
                                students: response[1],
                                classes: response[2],
                            }),
                        ),
                        catchError((error) =>
                            of(
                                InscriptionActions.loadOptionsFailure({
                                    error,
                                }),
                            ),
                        ),
                    ),
                ),
            );
        });
    }
}
