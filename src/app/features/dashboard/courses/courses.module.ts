import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailComponent,
    CoursesTableComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
})
export class CoursesModule {}
