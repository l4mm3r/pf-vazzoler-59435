import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../core/services/classes.service';
import { Class } from './models';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassDialogComponent } from './class-dialog/class-dialog.component';

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
    ){}

    isLoading = false;

    ngOnInit(): void {
        this.loadClasses();
    }

    loadClasses(): void {
        this.isLoading = true;
        this.classesService.getClasses().subscribe({
            next: (classes) => {
                this.classes = classes;
            },
            complete: () => {
                this.isLoading = false;
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
                            this.classes = [...this.classes, result];
                        }
                    }
                },
            });
    }

    handleUpdate(id: string, update: Class): void {
        this.isLoading = true;
        this.classesService.updateClassById(id, update).subscribe({
            next: (classes) => {
                this.classes = classes;
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }


    onDelete(id: string): void {
        this.isLoading = true;
        this.classesService.removeClassById(id).subscribe({
            next: (classes) => {
                this.classes = classes;
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    confirmDelete(id: string): void {
        const confirmed = window.confirm('Esta seguro de Eliminar este registro?');

        if(confirmed) {
            this.onDelete(id);
        }
    }


}