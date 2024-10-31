import { Component, Inject } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  AbstractControl, 
  ValidatorFn 
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../models';

interface UserDialogData {
  editingStudent?: Student;
}

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styles: [`
    .error-message {
      color: red;
      font-size: 0.8em;
      margin-top: 5px;
    }
    .invalid-input {
      border: 1px solid red;
    }
  `]
})
export class StudentDialogComponent {
  studentForm: FormGroup;
  submitted = false;

  // Roles disponibles 
  roles = [
    { value: 'student', label: 'Estudiante' },
    { value: 'admin', label: 'Administrador' },

  ];

  constructor(
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: UserDialogData,
  ) {
    this.studentForm = this.initForm(),
    this.patchFormValue();
  }

  // Método de inicialización del formulario con validaciones más robustas
  private initForm(): FormGroup {
    return this.formBuilder.group({
      firstName: [
        null, 
        [
          Validators.required, 
          Validators.minLength(2),
          Validators.maxLength(50),
          this.nameValidator()
        ]
      ],
      lastName: [
        null, 
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          this.nameValidator()
        ]
      ],
      email: [
        null, 
        [
          Validators.required, 
          Validators.email,
          this.emailValidator()
        ]
      ],
      role: [
        null, 
        [
          Validators.required,
          this.roleValidator()
        ]
      ],
      password: [
        null, 
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordValidator()
        ]
      ]
    });
  }

  // Validador personalizado para nombres
  private nameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      const valid = nameRegex.test(control.value);
      return valid ? null : { 'invalidName': true };
    };
  }

  // Validador personalizado para email
  private emailValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : { 'invalidEmail': true };
    };
  }

  // Validador personalizado para roles
  private roleValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const validRoles = this.roles.map(role => role.value);
      const valid = validRoles.includes(control.value);
      return valid ? null : { 'invalidRole': true };
    };
  }

  // Validador personalizado para contraseña
  private passwordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value;
      const hasNumber = /\d/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
      
      const passwordValid = hasNumber && hasUpper && hasLower && hasSpecial;
      return passwordValid ? null : { 'weakPassword': true };
    };
  }

  // Rellenar formulario si se está editando un usuario
  private patchFormValue(): void {
    if (this.data?.editingStudent) {
      this.studentForm.patchValue(this.data.editingStudent);
    }
  }

  // Obtener mensajes de error específicos
  getErrorMessage(controlName: string): string {
    const control = this.studentForm.get(controlName);
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
    if (control.errors['email'] || control.errors['invalidEmail']) {
      return 'Ingrese un correo electrónico válido';
    }
    if (control.errors['invalidName']) {
      return 'Solo se permiten letras y espacios';
    }
    if (control.errors['invalidRole']) {
      return 'Seleccione un rol válido';
    }
    if (control.errors['weakPassword']) {
      return 'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales';
    }
    return 'Entrada inválida';
  }

  // Verificar si un campo tiene error
  hasError(controlName: string): boolean {
    const control = this.studentForm.get(controlName);
    return control ? (control.invalid && (control.dirty || control.touched || this.submitted)) : false;
  }

  // Método de guardado con manejo de errores
  onSave(): void {
    // Marcar como enviado para mostrar errores
    this.submitted = true;

    // Verificar validez del formulario
    if (this.studentForm.invalid) {
      // Marcar todos los controles como tocados
      Object.keys(this.studentForm.controls).forEach(key => {
        const control = this.studentForm.get(key);
        control?.markAsTouched();
      });
      
      return;
    }

    // Cerrar diálogo y devolver valores del formulario
    this.matDialogRef.close({
      ...this.studentForm.value
    });
  }

  // Método para cancelar y cerrar el diálogo
  onCancel(): void {
    this.matDialogRef.close();
  }
}