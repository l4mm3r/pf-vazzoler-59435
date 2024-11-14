import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionActions } from './store/inscription.actions';
import { Inscription } from './models';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import {
    selectClassOptions,
    selectCourseOptions,
    selectInscriptions,
    selectLoadInscriptionError,
    selectStudentOptions,
} from './store/inscription.selectors';
import { Course } from '../courses/models';
import { Student } from '../students/models';
import { Class } from '../classes/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InscriptionsService } from '../../../core/services/inscriptions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-inscriptions',
    templateUrl: './inscriptions.component.html',
    styleUrl: './inscriptions.component.scss',
})
export class InscriptionsComponent implements OnInit {
    inscriptions$: Observable<Inscription[]>;
    courseOptions$: Observable<Course[]>;
    studentOptions$: Observable<Student[]>;
    classOptions$: Observable<Class[]>;
    loadInscriptionsError$: Observable<Error | null>;
    inscriptionForm: FormGroup;
    displayedColumns = ['courseName', 'className', 'studentName', 'actions'];
    isLoading = false;

    constructor(
        private matDialog: MatDialog,
        private store: Store,
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private inscriptionsService: InscriptionsService,
        private snackBar: MatSnackBar,
    ) {
        this.inscriptionForm = this.formBuilder.group({
            courseId: [null, [Validators.required]],
            classId: [null, [Validators.required]],
            studentId: [null, [Validators.required]],
        });
        this.loadInscriptionsError$ = this.store.select(
            selectLoadInscriptionError,
        );
        this.inscriptions$ = this.store.select(selectInscriptions);
        this.courseOptions$ = this.store.select(selectCourseOptions);
        this.classOptions$ = this.store.select(selectClassOptions);
        this.studentOptions$ = this.store.select(selectStudentOptions);
    }

    ngOnInit(): void {
        this.store.dispatch(InscriptionActions.loadInscriptions());
        this.store.dispatch(InscriptionActions.loadOptions());
    }

    private showError(message: string): void {
        this.snackBar.open(message, undefined, {
            duration: 3000,
        });
    }
    onSubmit(): void {
        if (this.inscriptionForm.invalid) {
            this.inscriptionForm.markAllAsTouched();
        } else {
            this.store.dispatch(
                InscriptionActions.createInscription(
                    this.inscriptionForm.value,
                ),
            );
            this.inscriptionForm.reset();
        }
    }

    onDelete(id: string): void {
        this.isLoading = true;
        this.inscriptionsService
            .removeUserById(id)
            .pipe(
                catchError((error) => {
                    this.showError(
                        'Error al eliminar la inscripcion. Por favor, intente nuevamente',
                    );
                    console.error('Error al eliminar la inscripcion', error);
                    return of(null);
                }),
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (result) => {
                    this.store.dispatch(InscriptionActions.loadInscriptions());
                    this.snackBar.open(
                        'Inscripcion eliminada exitosamente',
                        'Cerrar',
                        {
                            duration: 3000,
                        },
                    );
                },
            });
    }
    confirmDelete(id: string): void {
        const confirmed = window.confirm(
            '¿Esta seguro de eliminar este registro?',
        );

        if (confirmed) {
            this.onDelete(id);
        }
    }
    goToDetail(id: string): void {
        try {
            this.router.navigate(['detail', id], {
                relativeTo: this.activatedRoute,
            });
        } catch (error) {
            console.error('Error al navegar al detalle del alumno', error);
        }
    }
}
