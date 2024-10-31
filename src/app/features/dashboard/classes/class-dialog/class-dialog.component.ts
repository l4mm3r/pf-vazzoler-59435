import { Component, Inject, OnInit } from '@angular/core';
import { Class } from '../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from '../../../../core/services/courses.service';
import { catchError, Observable, of, startWith } from 'rxjs';
import { Course } from '../../courses/models';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ClassDialogData {
  editingClass?: Class
}


@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrl: './class-dialog.component.scss'
})
export class ClassDialogComponent implements OnInit{
classForm: FormGroup;
courses$: Observable<Course[]> | undefined;
isLoadingCourses = false;
coursesLoadError = false;


constructor(
  private matDialogRef: MatDialogRef<ClassDialogComponent>,
  private formBuilder: FormBuilder,
  private coursesService: CoursesService,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data?: ClassDialogData
){
  this.classForm = this.formBuilder.group({
    className: [null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]],
    classCourse: [null, [Validators.required]]
  });
  this.patchFormValue();
}

ngOnInit(): void {
  this.loadCourses();
  this.patchFormValue();
}

private loadCourses(): void {
  this.isLoadingCourses = true;
  this.courses$ = this.coursesService.getCourses().pipe(
    startWith([]),
    catchError((error) => {
      console.error('Error cargando los cursos', error);
      this.coursesLoadError = true;
      this.showError('Error al cargar los cursos. Por favor, intente nuevamente');
      return of([]);
    }),
    startWith([])
  )
}

private showError(message: string): void {
  this.snackBar.open(message, 'Cerrar', {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  })
}

patchFormValue() {
  if (this.data?.editingClass) {
    this.classForm.patchValue({
      className: this.data.editingClass.className,
      classCourse: this.data.editingClass.classCourse
    });
  }
}

onSave(): void {
  if (this.classForm.invalid) {
    this.markFormGroupTouched(this.classForm);
    this.showFormErrors();
    return;
  }

const className = this.classForm.get('className')?.value?.trim();
const classCourse = this.classForm.get('classCourse')?.value;

if (!className) {
  this.showError('El nombre de la clase no puede estar vacío');
  return
}

if (!classCourse) {
  this.showError('El curso de la clase no puede estar vacío');
  return;
}

const classData = {
  ...this.classForm.value,
  id: this.data?.editingClass
  ? this.data!.editingClass!.id
  : Math.random().toString(36).substr(2, 7),
};

this.matDialogRef.close(classData);
}

private markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    }
  })
}

private showFormErrors(): void {
  const errors: string[] = [];

  if (this.classForm.get('className')?.hasError('required')) {
    errors.push('El nombre de la clase es obligatorio');
  }
  if (this.classForm.get('className')?.hasError('minlength')) {
    errors.push('El nombre de la clase debe tener al menos 2 caracteres');
  }
  if (this.classForm.get('className')?.hasError('maxlength')) {
    errors.push('El nombre de la clase no puede exceder 50 caracteres');
  }
  if (this.classForm.get('classCourse')?.hasError('required')) {
    errors.push('Debe seleccionar un curso');
  }

  if (errors.length > 0) {
    errors.forEach(error => this.showError(error));
  }
}

onCancel(): void {
  this.matDialogRef.close();
}

}
