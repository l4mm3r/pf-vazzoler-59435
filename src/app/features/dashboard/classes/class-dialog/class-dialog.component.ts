import { Component, Inject } from '@angular/core';
import { Class } from '../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ClassDialogData {
  editingClass?: Class
}


@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrl: './class-dialog.component.scss'
})
export class ClassDialogComponent {
classForm: FormGroup;


constructor(
  private matDialogRef: MatDialogRef<ClassDialogComponent>,
  private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data?: ClassDialogData
){
  this.classForm = this.formBuilder.group({
    className: [null, [Validators.required]],
    classCourse: [null, [Validators.required]],
  });
  this.patchFormValue();
}

patchFormValue() {
  if (this.data?.editingClass){
    this.classForm.patchValue(this.data?.editingClass);
  }
}

onSave(): void {
  if (this.classForm.invalid) {
    this.classForm.markAllAsTouched();
  } else {
    this.matDialogRef.close({
      ...this.classForm.value,
      id: this.data?.editingClass
      ? this.data!.editingClass!.id
      : Math.random().toString(36).substr(2, 7),
    });
  }
}











}