import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { Student } from './models';
import { StudentsService } from '../../../core/services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, of } from 'rxjs';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
    displayedColumns: string[] = [
        'id',
        'name',
        'email',
        'createdAt',
        'actions',
    ];
    dataSource: Student[] = [];
    isLoading = false;

    constructor(
        private matDialog: MatDialog,
        private studentsService: StudentsService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.loadStudents();
    }

    private showError(message: string): void {
        this.snackBar.open(message, undefined, {
            duration: 3000,
        });
    }

    loadStudents(): void {
        this.isLoading = true;
        this.studentsService
            .getStudents()
            .pipe(
                catchError((error) => {
                    this.showError(
                        'Error al cargar los alumnos. Por favor, intente nuevamente',
                    );
                    console.error('Error al cargar los alumnos', error);
                    return of([]);
                }),
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (students) => {
                    this.dataSource = students;
                },
            });
    }

    openModal(editingStudent?: Student): void {
        this.matDialog
            .open(StudentDialogComponent, { data: { editingStudent } })
            .afterClosed()
            .subscribe({
                next: (result) => {
                    if (result) {
                        if (editingStudent && editingStudent.id) {
                            this.handleUpdate(editingStudent.id, result);
                        } else {
                            this.handleCreate(result);
                        }
                    }
                },
            });
    }

    handleCreate(newStudent: Student): void {
        this.isLoading = true;
        this.studentsService
            .createStudent(newStudent)
            .pipe(
                catchError((error) => {
                    this.showError(
                        'Error al crear el alumno. Por favor, intente nuevamente',
                    );
                    console.error('Error al crear el alumno', error);
                    return of(null);
                }),
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (result) => {
                    this.loadStudents();
                    this.snackBar.open('Alumno creado exitosamente', 'Cerrar', {
                        duration: 3000,
                    });
                },
            });
    }

    handleUpdate(id: string, update: Student): void {
        this.isLoading = true;
        this.studentsService
            .updateUserById(id, update)
            .pipe(
                catchError((error) => {
                    this.showError(
                        'Error al actualizar el alumno. Por favor, intente nuevamente',
                    );
                    console.error('Error al actualizar el alumno', error);
                    return of(null);
                }),
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (result) => {
                    this.loadStudents();
                    this.snackBar.open(
                        'Alumno actualizado exitosamente',
                        'Cerrar',
                        {
                            duration: 3000,
                        },
                    );
                },
            });
    }

    onDelete(id: string): void {
        this.isLoading = true;
        this.studentsService
            .removeUserById(id)
            .pipe(
                catchError((error) => {
                    this.showError(
                        'Error al eliminar el alumno. Por favor, intente nuevamente',
                    );
                    console.error('Error al eliminar el alumno', error);
                    return of(null);
                }),
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe({
                next: (result) => {
                    this.loadStudents();
                    this.snackBar.open(
                        'Alumno eliminado exitosamente',
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

    //transforma la url de absoluta a relativa
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
