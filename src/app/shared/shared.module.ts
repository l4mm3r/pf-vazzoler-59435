import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { StudentFullNamePipe } from './pipes/student-full-name.pipe';

import { HeaderSizeDirective } from './directives/header-size.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { Student } from '../features/dashboard/students/models/index';

@NgModule({
  declarations: [StudentFullNamePipe,  HeaderSizeDirective],
  imports: [CommonModule],
  exports: [
    MatListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatTableModule,
    StudentFullNamePipe,
    HeaderSizeDirective,
  ],
})
export class SharedModule {}
