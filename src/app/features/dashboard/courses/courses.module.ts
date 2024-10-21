import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CoursesComponent } from './courses.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CourseDialogComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
})
export class CoursesModule {}
