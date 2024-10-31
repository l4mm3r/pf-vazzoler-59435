import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../core/services/classes.service';
import { Class } from './models';
import { MatDialog } from '@angular/material/dialog';
import { ClassDialogComponent } from './class-dialog/class-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, of } from 'rxjs';

@Component({
    selector: 'app-classes',
    templateUrl: './classes.component.html',
    styleUrl: './classes.component.scss',
})
export class ClassesComponent implements OnInit{
    classes: Class[] = [];
    displayedColumns: string[] = ['id', 'name', 'course', 'actions'];

    constructor(
        private matDialog: MatDialog,
        private classesService: ClassesService,
        private snackBar: MatSnackBar,
    ){}

    isLoading = false;
    
    private showError(message: string): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
        })
    }

    ngOnInit(): void {
        this.loadClasses();
    }
    

    loadClasses(): void {
        this.isLoading = true;
        this.classesService.getClasses().pipe(
            catchError((error) => {
                this.showError('Error al cargar las clases. Por favor, intente nuevamente');
                console.error('Error cargando las clases', error);
                return of([])
            }),
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe({
            next: (classes) => {
                this.classes = classes;
            }
        });
    }

    openModal(editingClass?: Class): void{
        this.matDialog
            .open(ClassDialogComponent, { data: { editingClass } })
            .afterClosed()
            .subscribe({
                next: (result) => {
                    if (!!result) {
                        if (editingClass) {
                            this.handleUpdate(editingClass.id, result);
                        } else {
                            this.handleCreate(result);
                        }
                    }
                },
            });
    }

    private handleCreate(newClass: Class): void {
        this.isLoading = true;
        this.classesService.createClass(newClass).pipe(
            catchError((error) => {
                this.showError('Error al crear la clase. Por favor, intente nuevamente');
                console.error('Error creando la clase', error);
                return of(null);
            }),
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe({
            next: (result) => {
                this.loadClasses();
                this.snackBar.open('Clase creada exitosamente', 'Cerrar', {
                    duration: 3000
                });
            }
        });
    }

    handleUpdate(id: string, update: Class): void {
        this.isLoading = true;
        this.classesService.updateClassById(id, update).pipe(
            catchError((error) => {
                this.showError('Error al actualizar la clase. Por favor, intente nuevamente');
                console.error('Error actualizando la clase', error);
                return of(null);
            }),
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe({
            next: (response) => {
                if (Array.isArray(response)){
                    this.classes = response;
                    this.snackBar.open('Clase actualizada exitosamente', 'Cerrar', {
                        duration: 3000
                    });
                }
        }  
        });
    }


    onDelete(id: string): void {
        this.isLoading = true;
        this.classesService.removeClassById(id).pipe(
            catchError((error) => {
                this.showError('Error al eliminar la clase. Por favor, intente nuevamente');
                console.error('Error eliminando la clase', error);
                return of(null);
            }),
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe({
            next: (response) => {
                if (Array.isArray(response)) {
                    this.classes = response;
                    this.snackBar.open('Clase eliminada exitosamente', 'Cerrar', {
                        duration: 3000
                    })
                }
            }
        })
    }

    confirmDelete(id: string): void {
        const confirmed = window.confirm('¿Está seguro de Eliminar este registro?');

        if(confirmed) {
            this.onDelete(id);
        }
    }


}