import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from '../../../../core/services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, Observable, of } from 'rxjs';
import { Student } from '../../students/models';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-courses-table',
    templateUrl: './courses-table.component.html',
    styleUrl: './courses-table.component.scss',
})
export class CoursesTableComponent implements OnInit {
    @Input()
    courses: Course[] = [];
    displayedColumns = ['id', 'name', 'professor', 'actions'];

    isLoading = false;
    authStudent$: Observable<Student | null>;
    constructor(
        private matDialog: MatDialog,
        private coursesService: CoursesService,
        private snackBar: MatSnackBar,
        private authService: AuthService,
    ) {
        this.authStudent$ = this.authService.authStudent$;
    }

    ngOnInit(): void {
        this.loadCourses();
    }

    private showError(message: string): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
        });
    }

    loadCourses(): void {
        this.isLoading = true;
        this.coursesService
            .getCourses()
            .pipe(
                catchError((error) => {
                    this.showError(
                        'Error al cargar los cursos. Por favor, intente nuevamente',
                    );
                    console.error('Error cargando los cursos', error);
                    return of([]);
                }),
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (courses) => {
                    this.courses = courses;
                },
            });
    }

    openModal(editingCourse?: Course): void {
        this.matDialog
            .open(CourseDialogComponent, { data: { editingCourse } })
            .afterClosed()
            .subscribe({
                next: (result) => {
                    if (result) {
                        if (editingCourse && editingCourse.id) {
                            // Si existe editingCourse y tiene un ID, llama a handleUpdate
                            this.handleUpdate(editingCourse.id, result);
                        } else {
                            // Si no hay editingCourse, llama a handleCreate
                            this.handleCreate(result);
                        }
                    }
                },
            });
    }

    handleCreate(newCourse: Course): void {
        this.isLoading = true;
        this.coursesService
            .createCourse(newCourse)
            .pipe(
                catchError((error) => {
                    this.showError(
                        'Error al crear el curso. Por favor, intente nuevamente',
                    );
                    console.error('Error creando el curso', error);
                    return of(null);
                }),
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (result) => {
                    if (result !== null) {
                        this.loadCourses();
                        this.snackBar.open(
                            'Curso creado exitosamente',
                            'Cerrar',
                            {
                                duration: 3000,
                            },
                        );
                    }
                },
            });
    }

    handleUpdate(id: string, update: Course): void {
        this.isLoading = true;
        this.coursesService
            .updateCourseById(id, update)
            .pipe(
                catchError((error) => {
                    this.showError(
                        'Error al actualizar el curso. Por favor, intente nuevamente',
                    );
                    console.error('Error actualizando el curso', error);
                    return of(null);
                }),
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (result) => {
                    if (result !== null) {
                        this.loadCourses();
                        this.snackBar.open(
                            'Curso actualizado exitosamente',
                            'Cerrar',
                            {
                                duration: 3000,
                            },
                        );
                    }
                },
            });
    }

    onDelete(id: string): void {
        this.isLoading = true;
        this.coursesService
            .removeCourseById(id)
            .pipe(
                catchError((error) => {
                    this.showError(
                        'Error al eliminar el curso. Por favor, intente nuevamente.',
                    );
                    console.error('Error deleting course:', error);
                    return of(null);
                }),
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (response) => {
                    if (Array.isArray(response)) {
                        this.courses = response;
                        this.snackBar.open(
                            'Curso eliminado exitosamente',
                            'Cerrar',
                            {
                                duration: 3000,
                            },
                        );
                    }
                },
            });
    }

    confirmDelete(id: string): void {
        const confirmed = window.confirm(
            '¿Está seguro de eliminar este registro?',
        );

        if (confirmed) {
            this.onDelete(id);
        }
    }
}
