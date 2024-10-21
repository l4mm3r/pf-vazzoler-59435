import { Component, Inject } from '@angular/core';
import { Course } from '../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface CourseDialogData {
  editingCourse?: Course;
}

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styles: ``,
})
export class CourseDialogComponent {
  courseForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: CourseDialogData,
  ) {
    this.courseForm = this.formBuilder.group({
      courseName: [null, [Validators.required]],
      courseProfessor: [null, [Validators.required]],
    });
    this.patchFormValue();
  }

  patchFormValue() {
    if (this.data?.editingCourse) {
      this.courseForm.patchValue(this.data?.editingCourse);
    }
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.courseForm.value,
        id: this.data?.editingCourse
          ? this.data!.editingCourse!.id
          : Math.random().toString(36).substr(2, 7),
      });
    }
  }
}
