import { Component, Inject } from '@angular/core';
import { Course } from '../models';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface CourseDialogData {
  editingCourse?: Course;
}

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styles: [`
    .error-message {
      color: red;
      font-size: 0.8em;
      margin-top: 5px;
    }
    .invalid-input {
      border: 1px solid red;
    }
  `],
})

export class CourseDialogComponent {
  courseForm: FormGroup;
  submitted = false;

  constructor(
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: CourseDialogData,
  ) {
    this.courseForm = this.initForm();
    this.patchFormValue();
  }
  
  private initForm(): FormGroup {
    return this.formBuilder.group({
      courseName: [null, [Validators.required]],
      courseProfessor: [null, [Validators.required]],
    });
  }

  private noWhitespaceValidator(control: AbstractControl): {[key: string]: any} | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  private nameValidator(control: AbstractControl): {[key: string]: any} | null {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const valid = nameRegex.test(control.value);
    return valid ? null : { 'invalidName': true };
  }

  patchFormValue() {
    if (this.data?.editingCourse) {
      this.courseForm.patchValue(this.data?.editingCourse);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.courseForm.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      return 'Este campo es obligatorio';
    }
    if (control.errors['minlength']) {
      return `Debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control.errors['maxlength']) {
      return `No puede tener más de ${control.errors['maxlength'].requiredLength} caracteres`;
    }
    if (control.errors['whitespace']) {
      return 'No se permiten nombres vacíos o solo con espacios';
    }
    if (control.errors['invalidName']) {
      return 'Solo se permiten letras y espacios';
    }
    return 'Entrada inválida';
  }

  hasError(controlName: string): boolean {
    const control = this.courseForm.get(controlName);
    return control ? (control.invalid && (control.dirty || control.touched || this.submitted)) : false;
  }

 onSave(): void {
    // Marcar como enviado para mostrar errores
    this.submitted = true;

    // Verificar validez del formulario
    if (this.courseForm.invalid) {
      // Marcar todos los controles como tocados
      Object.keys(this.courseForm.controls).forEach(key => {
        const control = this.courseForm.get(key);
        control?.markAsTouched();
      });
      
      return;
    }

    try {
      this.matDialogRef.close({
        ...this.courseForm.value
      });
    } catch (error) {
      console.error('Error al guardar el curso:', error);
    }
  }

    onCancel(): void {
      this.matDialogRef.close();
    }
  }